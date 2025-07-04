import axios from "axios"
import pool from "./db.js";
import redisclient from "./redis.js";


const fetchcontest = async(type ="upcoming") =>{
    console.log("Fetching contests from Codeforces API...");
    
    const key = `codeforces:${type}`;
    const cachedata = await redisclient.get(key);
    if(cachedata){
        console.log("return the daat from cache tab");
        return JSON.parse(cachedata);
    }
    // eslint-disable-next-line no-undef
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
        const upcomingContests = sortedContests.slice(0, 5);
        for(const c of upcomingContests){
            const title = c.name;
            const platform = "Codeforces";
            const start_time = new Date(c.startTimeSeconds * 1000).toLocaleString();
            const duration = `${Math.floor(c.duration / 3600)} hr ${Math.floor((c.duration % 3600) / 60)} min`;
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
        
        const new_data = sortedContests.slice(0, 2).map(contest => {
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

        await redisclient.setEx(key, 1800, JSON.stringify(new_data));
        console.log("Cached contests in Redis.");
        return new_data;
        
    }
    catch(error){
        console.log("Error fetching contests:", error);
        throw new Error("Failed to fetch contests");
    }
    
};

export default fetchcontest;
