import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = () => {
    const [task, setTask] = useState({ title: "", description: "", dueDate: "" });
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (id) {
            axios
                .get(`https://to-do-app-placement-1.onrender.com/tasks`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    const existing = res.data.find((t) => t._id === id);
                    if (existing) setTask(existing);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axios.put(`https://to-do-app-placement-1.onrender.com/tasks/${id}`, task, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } else {
            await axios.post("https://to-do-app-placement-1.onrender.com/tasks", task, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-2xl w-full max-w-xl p-6 sm:p-8"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {id ? "Edit Task" : "Create Task"}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={task.title}
                        onChange={(e) => setTask({ ...task, title: e.target.value })}
                        placeholder="Enter task title"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={task.description}
                        onChange={(e) => setTask({ ...task, description: e.target.value })}
                        placeholder="Enter task description"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        rows={4}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Due Date</label>
                    <input
                        type="date"
                        value={task.dueDate?.substring(0, 10)}
                        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    {id ? "Update Task" : "Create Task"}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
