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


    return (
        <>
            {successMessage && (
                <div className="fixed top-20 left-0 right-0 mx-auto w-fit px-4 py-2 bg-green-500 text-white rounded shadow text-center z-50">
                {successMessage}
                </div>
            )}
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
                        {isLoggedIn === 0 ? (
                            <li>
                                <button onClick={() => setshowform(true)} className="hover:underline text-green-600">Login</button>
                            </li>
                        ) : (
                            <li>
                                <button className="hover:underline text-green-600">Profile</button>
                            </li>
                        )
                        }
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