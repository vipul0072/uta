import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import '../style/AdminLogin.css';
import adminImage from '../assets/tennis-balls-tennis-court.jpg'

const AdminLogin = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = () => {
        if (username === 'admin' && password === 'admin123') {
          localStorage.setItem("admin", JSON.stringify({ username }));
          localStorage.setItem("role", "admin"); // Mark as admin
          navigate('/admin-dashboard');
        } else {
          alert('Invalid credentials!');
        }
      };
      
    return(
        <div className="admin-login">
            <div className="login-container">
                <div className="login-image-section">
                    <img src={adminImage} alt="Admin" className="login-image" />
                </div>
                <div className="login-form-section">
                    <div className="login-form">
                        <h2>Admin Login</h2>
                        <div className="input-group">
                            <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="ad-btn" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin;