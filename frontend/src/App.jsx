import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Meals from "./pages/Meals";
import Workouts from "./pages/Workouts";
import Habits from "./pages/Habits";
import Chat from "./pages/Chat";
import BMICalculator from "./pages/BMICalculator";
import Analytics from "./pages/Analytics";
import History from "./pages/History";

const App = () => {
       return (
	       <AuthProvider>
		       <BrowserRouter>
			       <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
			       <Navbar />
			       <div style={{ flex: 1 }}>
			       <Routes>
				       <Route path="/" element={<Home />} />
				       <Route
					       path="/meals"
					       element={
						       <ProtectedRoute>
							       <Meals />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/workouts"
					       element={
						       <ProtectedRoute>
							       <Workouts />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/habits"
					       element={
						       <ProtectedRoute>
							       <Habits />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/chat"
					       element={
						       <ProtectedRoute>
							       <Chat />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/bmi"
					       element={
						       <ProtectedRoute>
							       <BMICalculator />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/analytics"
					       element={
						       <ProtectedRoute>
							       <Analytics />
						       </ProtectedRoute>
					       }
				       />

				       <Route path="/login" element={<Login />} />
				       <Route path="/register" element={<Register />} />
				       <Route path="/reset-password" element={<ResetPassword />} />
				       <Route
					       path="/profile"
					       element={
						       <ProtectedRoute>
							       <Profile />
						       </ProtectedRoute>
					       }
				       />
				       <Route
					       path="/history/:type"
					       element={
						       <ProtectedRoute>
							       <History />
						       </ProtectedRoute>
					       }
				       />
				       <Route path="*" element={<Home />} />
			       </Routes>
			       </div>
			       <Footer />
			       </div>
		       </BrowserRouter>
	       </AuthProvider>
       );
};

export default App;
