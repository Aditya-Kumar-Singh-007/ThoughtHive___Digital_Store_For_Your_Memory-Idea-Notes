import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLightMode, setIsLightMode] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => (location.pathname === path ? "active" : "");

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseLightMode = savedTheme === 'light' || (!savedTheme && !systemPrefersDark);
    
    setIsLightMode(shouldUseLightMode);
    document.documentElement.classList.toggle('light-theme', shouldUseLightMode);
  }, []);

  const toggleTheme = () => {
    const newLightMode = !isLightMode;
    setIsLightMode(newLightMode);
    document.documentElement.classList.toggle('light-theme', newLightMode);
    localStorage.setItem('theme', newLightMode ? 'light' : 'dark');
  };

  return (
    <>
      <button onClick={toggleTheme} className="create-btn-corner">
        <img 
          src={isLightMode ? '/light.png' : '/dark.png'} 
          alt={isLightMode ? 'Light mode active' : 'Dark mode active'}
        />
      </button>
      <nav className="modern-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <Link className="brand" to="/">
          ThoughtHive
        </Link>

        <ul className="nav-links" role="menubar" aria-label="Primary">
          <li role="none">
            <Link role="menuitem" className={isActive("/")} to="/">
              Home
            </Link>
          </li>
          <li role="none">
            <Link role="menuitem" className={isActive("/about")} to="/about">
              About
            </Link>
          </li>
        </ul>

        <div className="nav-auth" aria-hidden={false}>
          {!localStorage.getItem("token") ? (
            <>
              <Link className="auth-btn" to="/login">
                Login
              </Link>
              <Link className="auth-btn outline" to="/signup">
                SignUp
              </Link>
            </>
          ) : (
            <button className="auth-btn logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;
