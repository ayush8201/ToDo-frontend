import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import "../style/navbar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    dispatch(authActions.logout());
    sessionStorage.clear("id");
    navigate("/");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>ToDo</div>
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/toDo" onClick={toggleMenu}>To Do</Link></li>

          {!isLoggedIn && (
            <>
              <li><Link to="/signIn" onClick={toggleMenu}>Sign In</Link></li>
              <li><Link to="/signUp" onClick={toggleMenu}>Sign Up</Link></li>
            </>
          )}

          {isLoggedIn && (
            <li>
              <button onClick={() => { logout(); toggleMenu(); }} className="logout-btn">
                Log Out
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
