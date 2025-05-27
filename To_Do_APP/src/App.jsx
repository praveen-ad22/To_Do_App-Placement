import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TaskForm from "./pages/TaskForm";

const isAuthenticated = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/task-form/:id?"
        element={isAuthenticated() ? <TaskForm /> : <Navigate to="/" />}
      />
    </Routes>
  );
}
