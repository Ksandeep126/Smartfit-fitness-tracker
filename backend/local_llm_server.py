from flask import Flask, request, jsonify
from huggingface_hub import InferenceClient
import json

app = Flask(__name__)
llm_client = InferenceClient(model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", timeout=120)

@app.route("/llm", methods=["POST"])
def llm():
    data = request.json
    prompt = data.get("prompt", "")
    response = llm_client.post(
        json={
            "inputs": prompt,
            "parameters": {"max_new_tokens": 200},
            "task": "text-generation",
        }
    )
    text = json.loads(response.decode())[0]["generated_text"]
    return jsonify({"reply": text})

if __name__ == "__main__":
    app.run(port=5001)
