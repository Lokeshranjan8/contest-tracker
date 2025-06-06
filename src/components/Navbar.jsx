import { useState } from "react";
import { Form, Link } from "react-router-dom";

export default function Header() {
    const [showform, setshowform] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    setshowform(false);
    setName("");
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
                <div className="fixed inset-0 bg-black bg-opacity-100 flex justify-center items-center z-20 ">
                        <div className="bg-green-950 transition-transform hover:scale-[1.02] shadow-slate-40">
                        <form method="post" className="flex flex-col space-y-4 p-10"
                            onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold text-green-600">Login/Signup</h2>
                            <label className="text-green-600">Name:</label>
                            <input
                                type="text"name="name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-2 rounded-md border border-gray-300"
                            />
                            <label className="text-green-600">Email:</label>
                            <input 
                                type="email" name="email" value={email} 
                                onChange={(e)=> setEmail(e.target.value)}
                                className="p-2 rounded-md border border-gray-300"
                            />
                            <label className="text-green-600">Password:</label>
                            <input
                                type="password" name="password" value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-2 rounded-md border border-gray-300"
                            />
                            <button
                                type="submit"
                                className="px-2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                            >
                                SUBMIT
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </>
    )

}