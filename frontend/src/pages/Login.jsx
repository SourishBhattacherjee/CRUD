import { useState } from "react";
import { login as apiLogin } from "../services/authService";
import { useAuth } from "../auth";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .auth-root {
    min-height: 100vh;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .auth-root::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(236,72,153,0.07) 0%, transparent 70%);
    bottom: -50px;
    left: -50px;
    pointer-events: none;
  }

  .auth-card {
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 52px 48px;
    width: 100%;
    max-width: 420px;
    position: relative;
    z-index: 1;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    animation: cardIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .auth-eyebrow {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6366f1;
    margin-bottom: 10px;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-size: 32px;
    font-weight: 800;
    color: #f0f0f5;
    margin: 0 0 36px;
    line-height: 1.1;
  }

  .field {
    margin-bottom: 20px;
    animation: fieldIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }
  .field:nth-child(1) { animation-delay: 0.1s; }
  .field:nth-child(2) { animation-delay: 0.17s; }

  @keyframes fieldIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .field label {
    display: block;
    font-size: 12px;
    font-weight: 500;
    color: #8888a0;
    margin-bottom: 8px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .field input {
    width: 100%;
    background: #1c1c28;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 13px 16px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f5;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    box-sizing: border-box;
  }

  .field input:focus {
    border-color: #6366f1;
    background: #1e1e2e;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  .field input::placeholder { color: #44445a; }

  .auth-btn {
    width: 100%;
    margin-top: 10px;
    padding: 14px;
    background: #6366f1;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative;
    overflow: hidden;
    animation: fieldIn 0.4s 0.28s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  .auth-btn:hover {
    background: #5254e0;
    box-shadow: 0 8px 24px rgba(99,102,241,0.35);
    transform: translateY(-1px);
  }

  .auth-btn:active { transform: translateY(0); }

  .auth-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.06);
    margin: 28px 0 24px;
  }

  .auth-switch {
    text-align: center;
    font-size: 14px;
    color: #66667a;
  }

  .auth-switch a, .auth-switch button {
    background: none;
    border: none;
    cursor: pointer;
    color: #6366f1;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    text-decoration: none;
    padding: 0;
    transition: color 0.2s;
  }

  .auth-switch a:hover, .auth-switch button:hover { color: #a5b4fc; }

  .error-list {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .error-list li {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 8px;
    padding: 9px 13px;
    color: #fca5a5;
    font-size: 13px;
  }

  .error-single {
    margin-top: 16px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 8px;
    padding: 9px 13px;
    color: #fca5a5;
    font-size: 13px;
  }
`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      errors.push({ field: "email", message: "Valid email is required" });
    if (!password)
      errors.push({ field: "password", message: "Password is required" });
    if (errors.length) return setError(errors);

    try {
      setError("");
      const { token } = await apiLogin({ email, password });
      login(token);
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <div className="auth-eyebrow">Welcome back</div>
          <h1 className="auth-title">Sign in</h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn">Sign In →</button>
          </form>

          {Array.isArray(error) ? (
            <ul className="error-list">
              {error.map((e, i) => (
                <li key={i}>{e.field ? `${e.field}: ${e.message}` : e.message}</li>
              ))}
            </ul>
          ) : (
            error && <div className="error-single">{error}</div>
          )}

          <hr className="auth-divider" />
          <div className="auth-switch">
            New here?{" "}
            <button onClick={() => navigate("/register")}>Create an account</button>
          </div>
        </div>
      </div>
    </>
  );
}