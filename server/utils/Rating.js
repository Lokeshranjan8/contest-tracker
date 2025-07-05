import pool from '../db.js';
import redisclient from '../redis.js';

const Topic = async (handle) => {
    const Map_Rating = {};
    const key = `codeforces:rating:${handle}`;
    const cachedData = await redisclient.get(key);
    if (cachedData) {
        console.log("Returning the data from cache");
        return JSON.parse(cachedData);
    }

    try{
        const result = await pool.query(`
            SELECT problem_rating, COUNT(*) AS count
            FROM ac_sub
            WHERE handle = $1
            GROUP BY problem_rating
            ORDER BY problem_rating;
        `, [handle]);
        for(const c of result.rows){
            const rating = c.problem_rating;
            if(rating !== null){
                Map_Rating[rating] = parseInt(c.count);
            }
        }
        if(Object.keys(Map_Rating).length === 0){
            console.log("No ratings found for this user.");
            return [];
        }
        //console.log("Ratings Map:", Map_Rating);
        await redisclient.setEx(key, 1800, JSON.stringify(Map_Rating));
        console.log("Cached ratings data in Redis.");
        return Map_Rating;

    }catch(error){
        console.error("Error fetching topics data:", error);
        return null;
    }

}
export default Topic;