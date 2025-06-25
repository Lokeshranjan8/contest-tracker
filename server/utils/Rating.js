import pool from '../db.js';

const Topic = async (handle) => {
    const Map_Rating = {};
    const userResult = await pool.query(
        `SELECT user_id FROM profiles WHERE handle = $1`,
        [handle]
    );
    if (userResult.rows.length === 0) {
        console.log("User not found for handle:", handle);
        return {};
    }
    const user_id = userResult.rows[0].user_id;

    try{
        const result = await pool.query(`
            SELECT problem_rating, COUNT(*) AS count
            FROM ac_sub
            WHERE user_id = $1
            GROUP BY problem_rating
            ORDER BY problem_rating;
        `, [user_id]);
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
        return Map_Rating;

    }catch(error){
        console.error("Error fetching topics data:", error);
        return null;
    }

}
export default Topic;