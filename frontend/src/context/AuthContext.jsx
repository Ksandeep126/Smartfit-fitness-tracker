import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axiosClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const login = async (email, password) => {
		const res = await api.post("/auth/login", { email, password });
		localStorage.setItem("flexifit_token", res.data.token);
		// Fetch full user profile after login
		const profileRes = await api.get("/users/me");
		setUser(profileRes.data);
		return profileRes.data;
	};

	const register = async (name, email, password) => {
		const res = await api.post("/auth/register", { name, email, password });
		localStorage.setItem("flexifit_token", res.data.token);
		setUser(res.data);
	};

	const logout = () => {
		localStorage.removeItem("flexifit_token");
		setUser(null);
	};

	const fetchProfile = async () => {
		try {
			const res = await api.get("/users/me");
			setUser(res.data);
		} catch (err) {
			console.error(err);
			// If token is invalid, clear it
			localStorage.removeItem("flexifit_token");
			setUser(null);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("flexifit_token");
		if (token) {
			fetchProfile().finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
		// eslint-disable-next-line
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, login, register, logout, fetchProfile }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
