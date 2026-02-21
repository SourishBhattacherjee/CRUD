import { useState } from "react";
import { register as apiRegister } from "../services/authService";
import { useAuth } from "../auth";

export default function Register() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!name || !name.trim()) errors.push({ field: "name", message: "Name is required" });
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push({ field: "email", message: "Valid email is required" });
    if (!password || password.length < 6) errors.push({ field: "password", message: "Password must be at least 6 characters" });
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
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
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
