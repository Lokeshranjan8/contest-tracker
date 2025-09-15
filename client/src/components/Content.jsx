import Card from "./Card"
import {  useEffect, useState } from "react";

export default function Content() {
    const [selectedcontest,setselectedcontest]=useState(1);
    const [contestData, setContestData] = useState([]);

    useEffect(()=>{
        const Baseurl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const Mydata = async()=>{
            try{
                let data;
                const response_leetcode = await fetch (`${Baseurl}/leetcode`);
                const leetcodeData = await response_leetcode.json();
                if(selectedcontest===1){
                    const response = await fetch(`${Baseurl}/upcoming`);
                    data = await response.json();
                    console.log(response);
                }else{
                    const response = await fetch(`${Baseurl}/past`);
                    data = await response.json();
                    console.log(response);
                }   
                let allcontests = [...data, ...leetcodeData];
                setContestData(allcontests || []);

            }catch(err){
                console.error("Error fetching contest data:", err);
            }
        };
        Mydata();
    },[selectedcontest]);


    const contestshowing =  contestData;

    return (
        <main className="flex-1 px-2 sm:px-4 lg:px-6">
            <div className="max-w-7xl mx-auto bg-stone-900 rounded-lg p-3 sm:p-4 lg:p-6 shadow-md mt-6 mb-6">

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
                    <button
                        className={`text-sm sm:text-lg lg:text-xl font-semibold rounded-md shadow-md px-3 sm:px-4 py-2 transition-all duration-300 
                        ${selectedcontest === 1 ? "bg-emerald-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setselectedcontest(1)}
                    >
                        <span className="hidden sm:inline">UPCOMING CONTESTS</span>
                        <span className="sm:hidden">UPCOMING</span>
                    </button>

                    <button
                        className={`text-sm sm:text-lg lg:text-xl font-semibold rounded-md shadow-md px-3 sm:px-4 py-2 transition-all duration-300 
                        ${selectedcontest === 0 ? "bg-emerald-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setselectedcontest(0)}
                    >
                        <span className="hidden sm:inline">PAST CONTESTS</span>
                        <span className="sm:hidden">PAST</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
                    {contestshowing.map((x, index) => (
                        <Card
                            key={index}
                            title={x.name}
                            platform={x.platform}
                            starttime={x.startTime}
                            Link={x.url}
                        />
                    ))}
                </div>
            </div>
        </main>

    )
}
