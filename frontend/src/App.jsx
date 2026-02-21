import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div style={{ padding: 20 }}>
            <h1>CRUD App</h1>
            <p>
              <Link to="/login">Login</Link> | <Link to="/register">Register</Link> 
            </p>
          </div>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
