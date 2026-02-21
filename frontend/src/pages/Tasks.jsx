import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import TaskItem from "../components/TaskItem";

export default function Tasks(){
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const load = async ()=>{
    try{
      const data = await getTasks(token);
      setTasks(data);
    }catch(err){
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  useEffect(()=>{ if(token) load(); }, [token]);

  const handleCreate = async (e)=>{
    e.preventDefault();
    const errors = [];
    if (!title || !String(title).trim()) errors.push({ field: "title", message: "Title is required" });
    if (errors.length) return setError(errors);

    try{
      const t = await createTask(token, { title });
      setTasks(prev=>[t, ...prev]);
      setTitle("");
      setError("");
    }catch(err){
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  const handleUpdate = async (id, payload)=>{
    try{
      const updated = await updateTask(token, id, payload);
      setTasks(prev=> prev.map(t=> t._id===updated._id? updated : t));
      setError("");
    }catch(err){
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  const handleDelete = async (id)=>{
    try{
      await deleteTask(token, id);
      setTasks(prev=> prev.filter(t=> t._id !== id));
      setError("");
    }catch(err){
      const resp = err.response?.data;
      if (resp?.errors) setError(resp.errors);
      else setError(resp?.message || err.message);
    }
  };

  return (
    <div className="container">
      <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h2>Tasks</h2>
        <div>
          <span style={{marginRight:12}}>{user?.role || ''}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <form onSubmit={handleCreate} style={{marginBottom: 16}}>
        <input placeholder="New task" value={title} onChange={e=>setTitle(e.target.value)} />
        <button type="submit">Add</button>
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

      {tasks.map(t=> (
        <TaskItem key={t._id} task={t} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
}
