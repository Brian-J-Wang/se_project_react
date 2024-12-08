import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
    return (props.isLoggedIn) ? 
        props.children :
        <Navigate to="/" replace/>
}