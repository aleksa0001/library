import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import LoginComponent from "./LoginComponent";
//import RegisterComponent from "./RegisterComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoComponent from "./TodoComponent";

export default function TodoMain() {
  function AuthenticatedRoute({ children }) {
    const authContenxt = useAuth();
    if (authContenxt.isAuthenticated) return children;

    return <Navigate to="/" />;
  }

  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route
              path="/todo"
              element={
                <AuthenticatedRoute>
                  <TodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/home/:email"
              element={
                <AuthenticatedRoute>
                  <HomeComponent />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
