import { useState } from "react";
import { register as apiRegister } from "../services/authService";
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
    background: radial-gradient(circle, rgba(236,72,153,0.1) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    pointer-events: none;
  }

  .auth-root::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%);
    bottom: -50px;
    right: -50px;
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
    color: #ec4899;
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
  .field:nth-child(1) { animation-delay: 0.10s; }
  .field:nth-child(2) { animation-delay: 0.16s; }
  .field:nth-child(3) { animation-delay: 0.22s; }

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
    border-color: #ec4899;
    background: #1e1e2e;
    box-shadow: 0 0 0 3px rgba(236,72,153,0.12);
  }

  .field input::placeholder { color: #44445a; }

  .auth-btn {
    width: 100%;
    margin-top: 10px;
    padding: 14px;
    background: #ec4899;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    animation: fieldIn 0.4s 0.32s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  .auth-btn:hover {
    background: #db2777;
    box-shadow: 0 8px 24px rgba(236,72,153,0.32);
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

  .auth-switch button {
    background: none;
    border: none;
    cursor: pointer;
    color: #ec4899;
    font-size: 14px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    padding: 0;
    transition: color 0.2s;
  }

  .auth-switch button:hover { color: #f9a8d4; }

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

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!name || !name.trim())
      errors.push({ field: "name", message: "Name is required" });
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      errors.push({ field: "email", message: "Valid email is required" });
    if (!password || password.length < 6)
      errors.push({ field: "password", message: "Password must be at least 6 characters" });
    if (errors.length) return setError(errors);

    try {
      setError("");
      const { token } = await apiRegister({ name, email, password });
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
          <div className="auth-eyebrow">Get started</div>
          <h1 className="auth-title">Create account</h1>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Min. 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="auth-btn">Create Account →</button>
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
            Already have an account?{" "}
            <button onClick={() => navigate("/login")}>Sign in</button>
          </div>
        </div>
      </div>
    </>
  );
}