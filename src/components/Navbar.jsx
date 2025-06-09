import { useState } from "react";
import { Form, Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
export default function Header() {
    const [showform, setshowform] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginsignup, setloginsignup] = useState(false);

    const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    setshowform(false);
    setEmail("");
    setPassword("");
    };

    return (
        <>
            <div className=" w-full  bg-neutral-950  sticky z-10 top-0 h-20  p-5  ">
                <div className="flex justify-between bg-  " >
                    <div>
                        <h1 className="text-3xl font-semibold px-20  text-green-600">Contest Tracker</h1>
                    </div>

                    <ul className="flex  space-x-7 px-20 py-2">
                        <li>
                            <a href="/" className="hover:underline text-green-600">Home</a>
                        </li>
                        <li>
                            <Link to="/contest-ai-help" className="hover:underline text-green-600">Contest AI HELP</Link>
                        </li>
                        <li>
                            <button onClick={()=>setshowform(true)} className="hover:underline text-green-600">Login</button>
                        </li>
                    </ul>
                </div>
            </div>
            {showform && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 "
                            onClick={() => setshowform(false)} 
                        ><CloseIcon />
                            <i className="fas fa-times"></i>
                        </button>

                        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Login </h2>

                        <form method="post" className="space-y-5" onSubmit={handleSubmit}>
                            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                <EmailIcon className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full focus:outline-none text-gray-700"
                                />
                            </div>
                            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                                <LockOpenIcon className="text-gray-400 mr-2"/>
                                <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
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
                            Don't have an account?{" "}
                            <a href="#" className="text-cyan-600 hover:underline">
                                Signup here
                            </a>
                        </p>
                    </div>
                </div>

            )}
        </>
    )

}