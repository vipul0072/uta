import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = () => {
const navigate = useNavigate();
const user = localStorage.getItem("user");
const isAdmin = localStorage.getItem("role") === "admin";
const logout = () => {
localStorage.clear();
navigate("/"); // Redirect to home or login
};

return ( <div className="Nav"> <div className="Nav-link"> 
    <ul>


      {!user && !isAdmin && <li><Link to="/admin-login">Admin Login</Link></li>}
      {!user && !isAdmin && <li><Link to="/user-login">User Login</Link></li>}
      {!user && !isAdmin && <li><Link to="/register">Register</Link></li>}

      {(user || isAdmin) && (
        <>
          {isAdmin ? (
            <>
              <li><Link onClick={logout} to="/">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link onClick={logout} to="/user-login">Logout</Link></li>
            </>
          )}
        </>
      )}
    </ul>
  </div>
</div>

);
};

export default Navbar;
