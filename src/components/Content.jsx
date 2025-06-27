import Card from "./Card"
import {  useEffect, useState } from "react";

export default function Content() {
    const [selectedcontest,setselectedcontest]=useState(1);
    const [contestData, setContestData] = useState([]);

    useEffect(()=>{
        const Mydata = async()=>{
            try{
                let data;
                const response_leetcode = await fetch ('http://localhost:3000/leetcode');
                const leetcodeData = await response_leetcode.json();
                if(selectedcontest===1){
                    const response = await fetch('http://localhost:3000/upcoming');
                    data = await response.json();
                    console.log(response);
                }else{
                    const response = await fetch('http://localhost:3000/past');
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
        <main className="flex-1 px-4">
            <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 shadow-md mt-6 mb-6">

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <button
                        className={`text-lg sm:text-xl font-semibold rounded-md shadow-md px-4 py-2 transition-all duration-300 
                        ${selectedcontest === 1 ? "bg-emerald-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setselectedcontest(1)}
                    >
                        UPCOMING CONTESTS
                    </button>

                    <button
                        className={`text-lg sm:text-xl font-semibold rounded-md shadow-md px-4 py-2 transition-all duration-300 
                        ${selectedcontest === 0 ? "bg-emerald-600 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                        onClick={() => setselectedcontest(0)}
                    >
                        PAST CONTESTS
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
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
