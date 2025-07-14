import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Authform from "./Authform";

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
            <div className="w-full bg-neutral-950 fixed z-30 top-0 left-0 right-0 h-20 p-3 sm:p-5 shadow-lg">
                <div className="flex justify-between items-center h-full" >
                    <div className="group cursor-pointer">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold px-2 sm:px-4 lg:px-8 xl:px-20 text-emerald-400 hover:text-green-300 transition-all duration-300 transform hover:scale-105 drop-shadow-lg">
                            <span className="relative">
                                <span className="hidden sm:inline">CONTEST TRACKER</span>
                                <span className="sm:hidden">CONTEST</span>
                                <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                            </span>
                        </h1>
                    </div>

                    <ul className="flex space-x-2 sm:space-x-4 lg:space-x-7 px-2 sm:px-4 lg:px-8 xl:px-20 py-2 items-center text-sm sm:text-base lg:text-lg font-medium">
                        <li>
                            <Link
                                to="/"
                                className="relative group text-green-400 hover:text-green-300 transition-all duration-300"
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
                                className="relative group text-green-400 hover:text-green-300 transition-all duration-300"
                            >
                                <span className="relative">
                                    <span className="hidden sm:inline">Contest AI HELP</span>
                                    <span className="sm:hidden">AI Help</span>
                                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
                                </span>
                            </Link>
                        </li>

                        {isLoggedIn === 0 ? (
                            <li>
                                <button
                                    onClick={() => setshowform(true)}
                                    className="relative group text-green-400 hover:text-green-300 transition-all duration-300"
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
                                        className="relative group text-green-400 hover:text-green-300 transition-all duration-300"
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
                                        className="relative group text-red-400 hover:text-red-300 transition-all duration-300"
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