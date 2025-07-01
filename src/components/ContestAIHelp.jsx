/* eslint-disable no-unused-vars */
import { useState } from "react";
import ReactMarkdown from 'react-markdown';

export default function ContestAIHelp() {
    const [contestLink, setContestLink] = useState("");
    const [aiResponse, setAIResponse] = useState("");
    const [myintent,setintent] = useState("need in c++");
    const handleClick =  async(type) => {
        setintent(type);
        console.log("Button clicked with type:", type);
        try{
            const res = await fetch('http://localhost:3000/analyze', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: contestLink  ,  
                    intent: type         
                })

            })
            const data = await res.json();
            console.log("Response from server:", data);
            setAIResponse(data.response);
        }
        catch (error) {
            console.log("Error handling click backend not connec",error);
        }
    } ;

    return (
        <main className="flex-1">
            <div className="max-w-7xl mx-auto bg-stone-900 rounded-lg p-6 shadow-md mt-6 mb-6">
                <h1 className="text-3xl font-bold mb-4 text-center text-green-700">
                    Contest AI Helper 🤖
                </h1>


                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        value={contestLink}
                        onChange={(e) => setContestLink(e.target.value)}
                        placeholder="Paste your problem description here..."
                        className="w-full max-w-2xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="flex justify-between gap-2 py-5">

                    <button
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        onClick={()=>handleClick("need in c++")}
                    >
                        Provide C++ Solution
                    </button>
                    <button
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        onClick={()=>handleClick("give me in python")}
                    >
                        Provide Python Solution
                    </button>
                    <button
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                        onClick={()=>handleClick("give me hints")}
                    >
                        Give Me Hints
                    </button>
                    </div>

                </div>

                <div className="mt-10 p-4 border-t pt-6">
                    <h2 className="text-xl font-semibold mb-2">AI Output:</h2>
                    <div className="max-w-7xl mx-auto bg-emerald-400 rounded-lg p-6 shadow-2xl mt-6 mb-6 italic font-semibold">
                        <ReactMarkdown>{aiResponse || "Your AI-generated analysis will appear here after you submit a problem description."}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </main>
    );
}