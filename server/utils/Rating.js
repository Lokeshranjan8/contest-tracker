import pool from '../db.js';

const Topic = async (handle) => {
    const Map_Rating = {};

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
        return Map_Rating;

    }catch(error){
        console.error("Error fetching topics data:", error);
        return null;
    }

}
export default Topic;