import React, { useState, useEffect } from "react";
import {Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Clear form fields with delay to override browser auto-fill
    const timer = setTimeout(() => {
      setCredentials({ email: "", password: "" });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    if (!credentials.email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (!credentials.password) {
      setError("Please enter your password.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api/auth/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        navigate("/getallnotes");
      } else {
        // show backend message if present, else a default message
        setError(json.error || json.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <main
        className="login-outer"
        aria-live="polite"
      >
        <section className="login-card" aria-label="Login form">
          <header className="login-header">
            <h1 className="login-title">Welcome back</h1>
            <p className="login-sub">Sign in to your ThoughtHive account</p>
          </header>

          <form className="login-form" onSubmit={handleSubmitLogin} noValidate>
            {error && (
              <div className="login-error" role="alert">
                {error}
              </div>
            )}

            <label className="form-label">
              <span className="label-text">Email</span>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={onchange}
                className="form-input"
                placeholder="you@example.com"
                autoComplete="off"
                aria-required="true"
                disabled={loading}
              />
            </label>

            <label className="form-label password-label">
              <span className="label-text">Password</span>
              <div className="password-row">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={onchange}
                  className="form-input"
                  placeholder="Enter Your Password"
                  autoComplete="new-password"
                  aria-required="true"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="show-pass-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={0}
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <div className="form-actions">
              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </div>
          </form>

          <footer className="login-footer">
            <small>Don't have an account? <Link to="/signup">Sign up</Link></small>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Login;
