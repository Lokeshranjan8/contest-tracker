import Card from "./Card"
import { use, useState } from "react";

export default function Content() {
    const [selectedcontest,setselectedcontest]=useState(1);

    const upcomingContests = [
        {
            title: "Codeforces Round (Div. 2)",
            platform: "Codeforces",
            startTime: "May 24, 2025 - 6:30 PM",
            link: "https://codeforces.com/contests"
        
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
    ];

    const pastContests = [
        {
            title: "Codeforces Round (Div. 2)",
            platform: "Codeforces",
            startTime: "May 24, 2025 - 6:30 PM",
            link: "https://codeforces.com/contests"
        
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
        {
            title: "Codeforces Round (Div. 2)",
            platform: "Codeforces",
            startTime: "May 24, 2025 - 6:30 PM",
            link: "https://codeforces.com/contests"
        
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
        {
            title: "AtCoder Beginner Contest",
            platform: "AtCoder",
            startTime: "May 25, 2025 - 12:30 PM",
            link: "https://atcoder.jp/contests"
        },
        
    ];

    const contestshowing = selectedcontest ==1?upcomingContests : pastContests;

    return (
        <main className="flex-1">
            <div className="max-w-7xl mx-auto bg-white rounded-lg p-6 shadow-md mt-6 mb-6">
                <div className="flex gap-4">

                    <button className={`text-xl font-bold rounded-md shadown-md px-4 py-2 mb-4 ${selectedcontest===1?"bg-emerald-600 text-white" : "bg-gray-200"}`}
                       onClick={()=>setselectedcontest(1)}
                    >
                       UPCOMING CONTESTS
                    </button>

                    <button className={`text-xl font-bold rounded-md shadown-md px-4 py-2 mb-4 ${selectedcontest===0?"bg-emerald-600 text-white" : "bg-gray-200"}`}
                       onClick={()=>setselectedcontest(0)}
                    >
                     PAST CONTESTS
                    </button>

                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    {contestshowing.map((x, index) => (
                        <Card
                            key={index}
                            title={x.title}
                            platform={x.platform}
                            starttime={x.startTime}
                            Link={x.link}
                        />
                    ))}
                </div>
            </div>
        </main >
    )
}
