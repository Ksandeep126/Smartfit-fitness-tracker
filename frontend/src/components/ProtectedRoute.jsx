import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
	const { user, loading } = useAuth();

	// Show loading while checking authentication
	if (loading) {
		return (
			<div style={{ 
				display: "flex", 
				justifyContent: "center", 
				alignItems: "center", 
				height: "50vh",
				fontSize: 18,
				color: "#fff"
			}}>
				Loading...
			</div>
		);
	}

	// If not authenticated, redirect to login
	if (!user) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;
