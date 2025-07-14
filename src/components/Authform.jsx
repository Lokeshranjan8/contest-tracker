import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from "@mui/material/Button";

export default function Authform({ onClose, setSuccessMessage , setIsLoggedIn}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [issignup, setissignup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const BaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

        const url = issignup ? `${BaseUrl}/auth/signup` : `${BaseUrl}/auth/login`;
        const passeddata = { email, password };

        try {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(passeddata),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("userEmail", email);
            setSuccessMessage(data.message || (issignup ? "Signup successful!" : "Login successful!"));
            if( !issignup)  setIsLoggedIn(1);
            setTimeout(() => setSuccessMessage(""), 2000);
            onClose();
            setEmail("");
            setPassword("");
        }catch (err) {
            alert("Error: " + err.message);
        }
    };

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="w-full max-w-md bg-stone-900 rounded-xl shadow-lg p-6 sm:p-8 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 "
                    onClick={onClose}
                ><CloseIcon />
                    <i className="fas fa-times"></i>
                </button>

                <h2 className="text-center text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">{issignup ? "Create Account 🚀" : "Welcome Back 👋"}</h2>

                <form method="post" className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                    <div className="flex items-center border-2 border-gray-600 rounded-xl px-3 sm:px-4 py-3 bg-gray-800/50 backdrop-blur-sm focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all duration-300">
                        <EmailIcon className="text-gray-100 mr-2 text-xl sm:text-2xl" />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder={!issignup ? "Enter your registered Email" : "Email"}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full focus:outline-none text-white bg-transparent placeholder-gray-400 font-medium text-sm sm:text-base"
                        />
                    </div>
                    <div className="flex items-center border-2 border-gray-600 rounded-xl px-3 sm:px-4 py-3 bg-gray-800/50 backdrop-blur-sm focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all duration-300">
                        <LockOpenIcon className="text-gray-400 mr-2 text-xl sm:text-2xl" />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder={!issignup ? "Enter your registered Password" : "Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full focus:outline-none text-white bg-transparent placeholder-gray-400 font-medium text-sm sm:text-base"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl text-sm sm:text-base font-bold hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
                    >
                        ✨ {issignup ? "Create Account" : "Sign In"}
                    </button>
                </form>
                <p className="text-center text-xs sm:text-sm text-gray-600 mt-4">
                    {issignup ? "Don't have an account?" : "Already have an account?"}
                    <Button className="text-cyan-600 hover:underline ml-1" onClick={() => setissignup(!issignup)}>
                        {issignup ? "Login" : "Signup"}
                    </Button>
                </p>
            </div>
        </div>

    )
}