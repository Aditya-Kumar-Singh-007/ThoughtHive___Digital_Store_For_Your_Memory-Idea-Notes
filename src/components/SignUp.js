import React, { useState } from "react";
import {Link,useNavigate } from "react-router-dom";



const SignUp = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onchange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!info.name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!info.email.trim()) {
      setError("Please enter your email.");
      return false;
    }
    if (info.password.length < 5) {
      setError("Password must be at least 5 characters.");
      return false;
    }
    if (info.password !== info.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    
    try {
      console.log("Creating user account...");
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || "http://localhost:5000"}/api/auth/createuser`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: info.name, email: info.email, password: info.password }),
      });

      const json = await response.json();
      console.log("Signup response:", json);

      if (json.success) {
        console.log("Account created successfully");
        localStorage.setItem("token", json.authToken);
        navigate("/getallnotes");
      } else {
        console.log("Signup failed:", json.error || json.message);
        setError(json.error || json.message || "Account could not be created. Maybe this email already exists.");
      }
    } catch (err) {
      console.error("Network error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <main className="signup-outer" aria-live="polite">
        <section className="signup-card" aria-label="Sign up form">
          <header className="signup-header">
            <h1 className="signup-title">Create account</h1>
            <p className="signup-sub">Start your ThoughtHive journey — quick and free.</p>
          </header>

          <form className="signup-form" onSubmit={handleSubmitSignUp} noValidate>
            {error && (
              <div className="signup-error" role="alert">
                {error}
              </div>
            )}

            <label className="form-label">
              <span className="label-text">Name</span>
              <input
                type="text"
                name="name"
                value={info.name}
                onChange={onchange}
                className="form-input"
                placeholder="Your name"
                autoComplete="name"
                aria-required="true"
                disabled={loading}
              />
            </label>

            <label className="form-label">
              <span className="label-text">Email</span>
              <input
                type="email"
                name="email"
                value={info.email}
                onChange={onchange}
                className="form-input"
                placeholder="you@example.com"
                autoComplete="email"
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
                  value={info.password}
                  onChange={onchange}
                  className="form-input"
                  placeholder="At least 5 characters"
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
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>

            <label className="form-label">
              <span className="label-text">Confirm Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={info.confirmPassword}
                onChange={onchange}
                className="form-input"
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-required="true"
                disabled={loading}
              />
            </label>

            <div className="form-actions">
              <button type="submit" className="submit-btn" disabled={loading} aria-busy={loading}>
                {loading ? "Creating…" : "Create account"}
              </button>
            </div>
          </form>

          <footer className="signup-footer">
            <small>
              Already have an account? <Link to="/login">Log in</Link>
            </small>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
