import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogin = async () => {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const idToken = params.get("id_token");

      if (idToken) {
        const response = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: { "id_token": idToken },
        });
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/interview");
      } else {
        const domain = "your-cognito-domain.auth.us-east-1.amazoncognito.com";
        const clientId = "your-app-client-id";
        const redirectUri = window.location.origin + "/login";
        const loginUrl = `https://${domain}/login?response_type=token&client_id=${clientId}&redirect_uri=${redirectUri}`;
        window.location.href = loginUrl;
      }
    };

    handleLogin();
  }, [navigate]);

  return <p>Redirecting to login...</p>;
};

export default LoginPage;
