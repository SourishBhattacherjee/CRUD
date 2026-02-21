import { useState } from "react";
import { login as apiLogin } from "../services/authService";
import { useAuth } from "../auth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // client-side validation
    const errors = [];
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push({ field: "email", message: "Valid email is required" });
    if (!password) errors.push({ field: "password", message: "Password is required" });
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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      {Array.isArray(error) ? (
        <ul style={{ color: "red" }}>
          {error.map((e, i) => (
            <li key={i}>{e.field ? `${e.field}: ${e.message}` : e.message}</li>
          ))}
        </ul>
      ) : (
        error && <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}
