import React, { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const toggleCompleted = () => onUpdate(task._id, { completed: !task.completed });

  const save = () => {
    onUpdate(task._id, { title });
    setEditing(false);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, marginBottom: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="checkbox" checked={task.completed} onChange={toggleCompleted} />
        {editing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        ) : (
          <span style={{ textDecoration: task.completed ? "line-through" : "none", flex: 1 }}>{task.title}</span>
        )}
      </div>
      <div style={{ marginTop: 8 }}>
        {editing ? (
          <>
            <button onClick={save}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(task._id)} style={{ marginLeft: 8 }}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}
