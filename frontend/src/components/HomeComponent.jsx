import React from "react";
import { useAuth } from "./security/AuthContext";
import { useParams, Link } from "react-router-dom";

function HomeComponent() {
  const { email } = useParams();

  const authContenxt = useAuth();
  const isAuthenticated = authContenxt.isAuthenticated;
  function logout() {
    authContenxt.logout();
  }
  return (
    <div>
      <h1>HomeComponent</h1>
      <div className="card">
        <h2 className="card-header">
          <h1>Welcome {email}</h1>
        </h2>
      </div>
      <div className="container">
        <Link className="nav-link" to="/todo">
          Todo
        </Link>
        {isAuthenticated && (
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default HomeComponent;
