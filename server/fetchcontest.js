import axios from "axios"
import pool from "./DB/db.js";
import redisclient from "./Caching/redis.js";


const fetchcontest = async(type ="upcoming", Refresh=false) =>{
    console.log("Fetching contests from Codeforces API...");
    
    const key = `codeforces:${type}`;
    if(!Refresh){
        try{
            const cachedata = await redisclient.get(key);
            if(cachedata){
                console.log("Returning data from Redis cache");
                return JSON.parse(cachedata);
            }
        }catch(error){
            throw new Error("Error fetching from cache" + error.message);
        }
    }

    const url = process.env.CODEFORCES_API;    
    const {data} = await axios.get(url);
    
    try {
        const contests = data.result;
        const now = Math.floor(Date.now() / 1000);

        let filteredContests;
        if (type === "upcoming") {
            filteredContests = contests.filter(contest => contest.startTimeSeconds > now);
        } else {
            filteredContests = contests.filter(contest => contest.startTimeSeconds <= now);
        }
        const sortedContests = filteredContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
        const upcomingContests = sortedContests.slice(0, 10);
        for(const c of upcomingContests){
            const title = c.name;
            const platform = "Codeforces";
            const start_time = new Date(c.startTimeSeconds * 1000).toLocaleString();
            const durationSeconds = c.durationSeconds;
            const duration = Number.isFinite(durationSeconds)
                ? `${Math.floor(durationSeconds / 3600)} hr ${Math.floor((durationSeconds % 3600) / 60)} min`
                : "Unknown";

            const link = `https://codeforces.com/contests/${c.id}`;
            try{
                await pool.query(
                    `INSERT INTO contests (title, platform, start_time, duration, link)
                     VALUES ($1, $2, $3, $4, $5)
                     ON CONFLICT (title, platform) DO NOTHING`,
                     [title, platform, start_time, duration, link]
                )
                console.log("CODEFORCES data inserted successfully");

            }catch(error){
                console.error("Error inserting contest data:", error);
            }
        }
        
        const new_data = sortedContests.slice(0, 10).map(contest => {
            const durationSeconds = contest.durationSeconds;
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const formattedDuration = `${hours} hr ${minutes} min`;

            return {
                name: contest.name,
                platform: "Codeforces",
                startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
                duration: formattedDuration,
                url: `https://codeforces.com/contests/${contest.id}`,
            }
        })

        await redisclient.setEx(key, 30, JSON.stringify(new_data));
        return new_data;
        
    }
    catch(error){
        console.log("Error fetching contests:", error);
        throw new Error("Failed to fetch contests");
    }
    
};

export default fetchcontest;
