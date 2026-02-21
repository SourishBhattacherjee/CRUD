import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .home-root {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .home-root::before {
    content: '';
    position: absolute;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(99,102,241,0.13) 0%, transparent 65%);
    top: -200px;
    right: -150px;
    pointer-events: none;
  }

  .home-root::after {
    content: '';
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%);
    bottom: -150px;
    left: -100px;
    pointer-events: none;
  }

  /* Subtle grid texture */
  .home-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }

  .home-content {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 24px;
    animation: heroIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .home-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99,102,241,0.1);
    border: 1px solid rgba(99,102,241,0.25);
    border-radius: 20px;
    padding: 5px 14px;
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #a5b4fc;
    margin-bottom: 28px;
  }

  .home-eyebrow::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #6366f1;
    border-radius: 50%;
    box-shadow: 0 0 8px #6366f1;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  .home-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(48px, 8vw, 80px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: #f0f0f5;
    margin-bottom: 20px;
  }

  .home-title span {
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .home-subtitle {
    font-size: 17px;
    color: #55556a;
    max-width: 380px;
    margin: 0 auto 48px;
    line-height: 1.6;
  }

  .home-actions {
    display: flex;
    gap: 14px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #6366f1;
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    border: 1px solid transparent;
  }

  .btn-primary:hover {
    background: #5254e0;
    box-shadow: 0 8px 28px rgba(99,102,241,0.35);
    transform: translateY(-2px);
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: #f0f0f5;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    padding: 14px 28px;
    border-radius: 12px;
    text-decoration: none;
    border: 1px solid rgba(255,255,255,0.1);
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }

  .btn-secondary:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-2px);
  }

  .btn-secondary:active { transform: translateY(0); }

  .home-footer {
    position: absolute;
    bottom: 28px;
    font-size: 13px;
    color: #33334a;
    z-index: 1;
  }
`;

function Home() {
  return (
    <>
      <style>{styles}</style>
      <div className="home-root">
        <div className="home-grid" />
        <div className="home-content">
          <div className="home-eyebrow">Now live</div>
          <h1 className="home-title">
            Get things<br /><span>done.</span>
          </h1>
          <p className="home-subtitle">
            A clean, fast task manager. Sign in to pick up where you left off, or create a new account to get started.
          </p>
          <div className="home-actions">
            <Link to="/login" className="btn-primary">Sign In →</Link>
            <Link to="/register" className="btn-secondary">Create Account</Link>
          </div>
        </div>
        <div className="home-footer">taskflow · built with ♥</div>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;