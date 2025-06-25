import axios from "axios";
import pool from "../db";

const Submission = async (handle) => {
    console.log("Fetching submission data for:", handle);
    const url = `https://codeforces.com/api/user.status?handle=${handle}`;
    const userid = await pool.query(`SELECT user_id FROM profiles WHERE  handle = $1`, [handle]);
    if (userid.rows.length === 0) {
        console.error("User not found in the database.");
        return null;
    }
    
    try{
        const response = await axios.get(url);
        const submission_data = response.data.result;
        const ac = submission_data.filter(x => x.verdict === "OK");
        const mydata = [];

        for(const c of ac ){
            const subid = c.id;
            const creationTimeSeconds = c.creationTimeSeconds;
            const creation_time = new Date(creationTimeSeconds * 1000);
            const problem = c.problem;
            const problem_rating = problem.rating || null;
            const problem_tags = problem.tags || [];

    

            mydata.push({
                subid,
                userid,
                creation_time,
                problem_rating,
                problem_tags
            });
        }
        if(mydata.length === 0){
            console.log("No accepted submissions found for this user.");
            return [];
        }
        
        for(const c of mydata){
            await pool.query(
                `INSERT INTO ac_sub (submission_id, user_id, creation_time, problem_rating, tags)
                 VALUES ($1, $2, $3, $4, $5)
                 ON CONFLICT (submission_id) DO NOTHING`,
                [c.subid, userid, c.creation_time, c.problem_rating, c.problem_tags]
            );

        }
        console.log("Submission data inserted successfully");
        return mydata;
    }catch(error){
        console.error("Error fetching submission data:", error);
        return null;
    }

}
export default Submission;