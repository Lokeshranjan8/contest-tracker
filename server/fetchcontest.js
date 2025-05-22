import axios from "axios"

const fetchcontest = async() =>{
    
    const url = process.env.CODEFORCES_API;
    const {data} = await axios.get(url);

    if(data.status !="OK" ) throw new Error("API fetching failed")
    
    const upcomingcontest = data.result 
        .filter(contest => contest.phase === "BEFORE")
        .map(contest =>({
            title: contest.name,
            platform:"Codeforces",
            startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
            link: `https://codeforces.com/contests/${contest.id}`
        }));
    return upcomingcontest.slice(0, 5);
};

export default fetchcontest;