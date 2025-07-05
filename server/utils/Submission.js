import axios from "axios";
import pool from '../db.js';
import redisclient from '../redis.js';

const Submission = async (handle) => {
    console.log("Fetching submission data for:", handle);
    const url = `https://codeforces.com/api/user.status?handle=${handle}`;

    const key = `codeforces:submission:${handle}`;
    const cachedData = await redisclient.get(key);
    if (cachedData) {
        console.log("Returning the data from cache");
        return JSON.parse(cachedData);
    }
    
    try{
        const response = await axios.get(url);
        const submission_data = response.data.result;
        const ac = submission_data.filter(x => x.verdict === "OK");
        const mydata = [];

        for(const c of ac ){
            const contest_id = c.contestId;
            const problem_index = c.problem.index;
            const creationTimeSeconds = c.creationTimeSeconds;
            const creation_time = new Date(creationTimeSeconds * 1000);
            const problem = c.problem;
            const problem_rating = problem.rating || null;
            const problem_tags = problem.tags || [];

    

            mydata.push({
                contest_id,
                problem_index,
                creation_time,
                problem_rating,
                problem_tags
            });
        }
        if(mydata.length === 0){
            console.log("No accepted submissions found for this user.");
            return [];
        }
        
        for (const c of mydata) {
            await pool.query(
                `INSERT INTO ac_sub (contest_id,problem_index, handle, creation_time, problem_rating, tags)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (handle,contest_id,problem_index) DO NOTHING`,
                 [c.contest_id,c.problem_index, handle, c.creation_time, c.problem_rating, c.problem_tags]
            );
        }
        await redisclient.setEx(key, 1800, JSON.stringify(mydata));
        console.log("Cached submission data in Redis.");
        return mydata;
    }catch(error){
        console.error("Error fetching submission data:", error);
        return null;
    }

}
export default Submission;