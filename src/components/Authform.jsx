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

        const url = issignup ? "http://localhost:3000/auth/signup" : "http://localhost:3000/auth/login";
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
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative">
                <button
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 "
                    onClick={onClose}
                ><CloseIcon />
                    <i className="fas fa-times"></i>
                </button>

                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">{issignup ? "Signup" : "Login"}</h2>

                <form method="post" className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <EmailIcon className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder={!issignup ? "Enter your registered Email" : "Email"}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full focus:outline-none text-gray-700"
                        />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                        <LockOpenIcon className="text-gray-400 mr-2" />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder={!issignup ? "Enter your registered Password" : "Password"}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full focus:outline-none text-gray-700"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-cyan-600 text-white py-2 rounded-md text-sm font-medium hover:bg-cyan-700 transition"
                    >
                        Submit
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">
                    {issignup ? "Don't have an account?" : "Already have an account?"}
                    <Button className="text-cyan-600 hover:underline" onClick={() => setissignup(!issignup)}>
                        {issignup ? "Login" : "Signup"}
                    </Button>
                </p>
            </div>
        </div>

    )
}