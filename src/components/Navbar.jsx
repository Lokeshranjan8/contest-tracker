import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Authform from "./Authform";
import Regform from "./Regform";

export default function Header() {
    const [showform, setshowform] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(0);

    useEffect(() =>{
        const token = localStorage.getItem("authToken");
        if( token ) {
            setIsLoggedIn(1);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(0);
        setSuccessMessage("Logged out successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
    };


    return (
        <>
            {successMessage && (
                <div className="fixed top-20 left-0 right-0 mx-auto w-fit px-4 py-2 bg-green-500 text-white rounded shadow text-center z-50">
                {successMessage}
                </div>
            )}
            <div className="w-full bg-neutral-950 sticky z-30 top-0 h-20 p-5">
                <div className="flex justify-between items-center" >
                    <div className="group cursor-pointer">
                        <h1 className="text-3xl lg:text-4xl font-bold px-4 sm:px-8 lg:px-20 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 bg-clip-text text-transparent hover:from-green-300 hover:via-emerald-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 drop-shadow-lg">
                            <span className="relative">
                                CONTEST TRACKER
                                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                            </span>
                        </h1>
                    </div>

                    <ul className="flex space-x-7 px-4 sm:px-8 lg:px-20 py-2 items-center text-lg font-medium">
                        <li>
                            <Link
                                to="/"
                                className="relative group text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 hover:from-green-300 hover:via-emerald-400 hover:to-cyan-400 transition-all duration-300"
                            >
                                <span className="relative">
                                    Home
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/contest-ai-help"
                                className="relative group text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 hover:from-green-300 hover:via-emerald-400 hover:to-cyan-400 transition-all duration-300"
                            >
                                <span className="relative">
                                    Contest AI HELP
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                </span>
                            </Link>
                        </li>

                        {isLoggedIn === 0 ? (
                            <li>
                                <button
                                    onClick={() => setshowform(true)}
                                    className="relative group text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 hover:from-green-300 hover:via-emerald-400 hover:to-cyan-400 transition-all duration-300"
                                >
                                    <span className="relative">
                                        Login
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                    </span>
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        to="/reg-form"
                                        className="relative group text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 hover:from-green-300 hover:via-emerald-400 hover:to-cyan-400 transition-all duration-300"
                                    >
                                        <span className="relative">
                                            Profile
                                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="relative group text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-300 hover:via-red-400 hover:to-red-500 transition-all duration-300"
                                    >
                                        <span className="relative">
                                            Logout
                                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-400 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                        </span>
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                </div>
            </div>
            {showform && (
                <Authform
                    onClose={() => setshowform(false)}
                    setSuccessMessage={setSuccessMessage}
                    setIsLoggedIn={setIsLoggedIn}
                />
            )}
        </>
    )

}