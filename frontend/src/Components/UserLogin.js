import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/UserLogin.css";

const UserLogin = () => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      const user = JSON.parse(auth);
      navigate(`/user-details/${user._id}`);
    }
  }, []);

  const handleLogin = async () => {
    if (!whatsappNumber || !dob) {
      setError("Please enter WhatsApp number and DOB");
      return;
    }

    const trimmedNumber = whatsappNumber.trim();
    const trimmedDob = dob.trim();

    try {
      let response = await fetch("http://localhost:5000/api/v1/player/login-player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: trimmedNumber, dob: trimmedDob }),
      });

      let result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        localStorage.setItem("role", "user");

        navigate(`/user-details/${result.user._id}`);
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="user-login">
      <div className="login-image">
        <div className="login-form">
          <h1>User Login</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="login-input">
            <input
              type="text"
              placeholder="WhatsApp Number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="login-input">
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="user-btn">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
