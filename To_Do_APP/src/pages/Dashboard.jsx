import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const res = await axios.get("https://to-do-app-placement-1.onrender.com/tasks", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    };

    const deleteTask = async (id) => {
        await axios.delete(`https://to-do-app-placement-1.onrender.com/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchTasks();
    };

    const markComplete = async (id) => {
        await axios.put(
            `https://to-do-app-placement-1.onrender.com/tasks/${id}`,
            { status: true },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchTasks();
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="p-4 max-w-4xl mx-auto w-full sm:px-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
                <h2 className="text-2xl font-bold">Your Tasks</h2>
                <Link
                    to="/task-form"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                >
                    + Add Task
                </Link>
            </div>

            {tasks.length === 0 ? (
                <p className="text-gray-600 text-center">No tasks available. Add one!</p>
            ) : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="border p-4 rounded-xl shadow-md bg-white flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
                        >
                            <div>
                                <h3 className="text-xl font-semibold">{task.title}</h3>
                                <p className="text-gray-700">{task.description}</p>
                                {task.dueDate && (
                                    <p className="text-sm text-gray-500 mt-1">
                                        Due: <span className="font-medium">{formatDate(task.dueDate)}</span>
                                    </p>
                                )}
                                <p className="mt-1">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${task.status ? "text-green-600" : "text-yellow-500"
                                            }`}
                                    >
                                        {task.status ? "Completed" : "Pending"}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap sm:flex-col gap-2 sm:items-end">
                                <Link
                                    to={`/task-form/${task._id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    ✏️ Edit
                                </Link>
                                <button
                                    onClick={() => deleteTask(task._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    🗑️ Delete
                                </button>
                                {!task.status && (
                                    <button
                                        onClick={() => markComplete(task._id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        ✅ Mark as Complete
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
