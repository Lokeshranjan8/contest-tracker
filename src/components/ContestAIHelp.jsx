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
                <h1 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
                    Contest AI Helper 🤖
                </h1>


                <div className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        value={contestLink}
                        onChange={(e) => setContestLink(e.target.value)}
                        placeholder="Paste your problem description here..."
                        className="w-full max-w-2xl px-4 py-3 border-2 border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 font-medium transition-all duration-300"
                    />
                    <div className="flex flex-wrap justify-center gap-4 py-5">

                    <button
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-500"
                        onClick={()=>handleClick("need in c++")}
                    >
                        🔧 Provide C++ Solution
                    </button>
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-emerald-500"
                        onClick={()=>handleClick("give me in python")}
                    >
                        🐍 Provide Python Solution
                    </button>
                    <button
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-purple-500"
                        onClick={()=>handleClick("give me hints")}
                    >
                        💡 Give Me Hints
                    </button>
                    </div>

                </div>

                <div className="mt-10 p-4 border-t border-gray-600 pt-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">AI Output:</h2>
                    <div className="max-w-7xl mx-auto bg-emerald-400 rounded-lg p-6 shadow-2xl mt-6 mb-6 italic font-semibold">
                        <ReactMarkdown>{aiResponse || "Your AI-generated analysis will appear here after you submit a problem description."}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </main>
    );
}