import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate=useNavigate();
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        if (token) {
            try {
                localStorage.setItem('token', token)
                 navigate('/dashboard')

            } catch (err) {
                console.error('Invalid token', err);
            }
        }
    }, []);
    const handleLogin = () => {
        window.location.href = `https://to-do-app-api-swart.vercel.app/auth/google`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300 px-4 py-10">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-10 w-full max-w-md mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-3">
                    To Do App
                </h1>
                <p className="text-gray-600 text-sm sm:text-base mb-6">
                    Organize your tasks efficiently — Sign in to get started!
                </p>

                <button
                    onClick={handleLogin}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
