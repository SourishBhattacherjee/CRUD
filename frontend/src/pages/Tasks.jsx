import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import TaskItem from "../components/TaskItem";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  .tasks-root {
    min-height: 100vh;
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f5;
    padding: 0 0 60px;
    position: relative;
    overflow-x: hidden;
  }

  .tasks-root::before {
    content: '';
    position: fixed;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%);
    top: -200px;
    right: -200px;
    pointer-events: none;
    z-index: 0;
  }

  .tasks-header {
    background: rgba(13,13,20,0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 32px;
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
  }

  .tasks-logo {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: #f0f0f5;
    letter-spacing: -0.02em;
  }

  .tasks-logo span {
    color: #6366f1;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .role-badge {
    background: rgba(99,102,241,0.12);
    border: 1px solid rgba(99,102,241,0.25);
    color: #a5b4fc;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .logout-btn {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    color: #8888a0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    padding: 6px 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background: rgba(239,68,68,0.1);
    border-color: rgba(239,68,68,0.25);
    color: #fca5a5;
  }

  .tasks-body {
    max-width: 680px;
    margin: 0 auto;
    padding: 40px 24px 0;
    position: relative;
    z-index: 1;
  }

  .tasks-headline {
    font-family: 'Syne', sans-serif;
    font-size: 36px;
    font-weight: 800;
    color: #f0f0f5;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }

  .tasks-subline {
    font-size: 15px;
    color: #55556a;
    margin: 0 0 32px;
  }

  .create-form {
    display: flex;
    gap: 10px;
    margin-bottom: 32px;
    animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .create-input {
    flex: 1;
    background: #13131a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 13px 18px;
    font-size: 15px;
    font-family: 'DM Sans', sans-serif;
    color: #f0f0f5;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .create-input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
  }

  .create-input::placeholder { color: #44445a; }

  .create-btn {
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 13px 22px;
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  }

  .create-btn:hover {
    background: #5254e0;
    box-shadow: 0 6px 20px rgba(99,102,241,0.3);
    transform: translateY(-1px);
  }

  .create-btn:active { transform: translateY(0); }

  .error-list {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
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
    margin-bottom: 20px;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    border-radius: 8px;
    padding: 9px 13px;
    color: #fca5a5;
    font-size: 13px;
  }

  .tasks-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .tasks-empty {
    text-align: center;
    padding: 60px 0;
    color: #44445a;
  }

  .tasks-empty-icon {
    font-size: 40px;
    margin-bottom: 12px;
  }

  .tasks-empty p {
    font-size: 15px;
    margin: 0;
  }

  /* Override TaskItem styles to match theme */
  .tasks-list > * {
    background: #13131a !important;
    border: 1px solid rgba(255,255,255,0.07) !important;
    border-radius: 12px !important;
    transition: border-color 0.2s, transform 0.15s !important;
  }

  .tasks-list > *:hover {
    border-color: rgba(99,102,241,0.3) !important;
    transform: translateX(3px) !important;
  }
`;

export default function Tasks() {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  useEffect(() => { if (token) load(); }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!title || !String(title).trim())
      errors.push({ field: "title", message: "Title is required" });
    if (errors.length) return setError(errors);

    try {
      const t = await createTask(token, { title });
      setTasks(prev => [t, ...prev]);
      setTitle("");
      setError("");
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      const updated = await updateTask(token, id, payload);
      setTasks(prev => prev.map(t => t._id === updated._id ? updated : t));
      setError("");
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(token, id);
      setTasks(prev => prev.filter(t => t._id !== id));
      setError("");
    } catch (err) {
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="tasks-root">
        <header className="tasks-header">
          <div className="tasks-logo">task<span>flow</span></div>
          <div className="header-right">
            {user?.role && <span className="role-badge">{user.role}</span>}
            <button className="logout-btn" onClick={logout}>Sign out</button>
          </div>
        </header>

        <div className="tasks-body">
          <h1 className="tasks-headline">My Tasks</h1>
          <p className="tasks-subline">
            {tasks.length === 0 ? "Nothing yet — add your first task below." : `${tasks.length} task${tasks.length !== 1 ? "s" : ""} in your list`}
          </p>

          <form onSubmit={handleCreate} className="create-form">
            <input
              className="create-input"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <button type="submit" className="create-btn">+ Add</button>
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

          {tasks.length === 0 ? (
            <div className="tasks-empty">
              <div className="tasks-empty-icon">✦</div>
              <p>No tasks yet. Add one above to get started.</p>
            </div>
          ) : (
            <div className="tasks-list">
              {tasks.map(t => (
                <TaskItem key={t._id} task={t} onUpdate={handleUpdate} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}