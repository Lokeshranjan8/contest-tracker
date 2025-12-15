import pool from '../DB/db.js';
import { timeoutp } from './Timeout.js';


const Rating = async (handle) => {
    if (!handle) throw new Error("Handle is required");

    let result;
    try{
        result = await timeoutp(
            pool.query(`
            SELECT problem_rating, COUNT(*) AS count
            FROM ac_sub
            WHERE handle = $1
            GROUP BY problem_rating
            ORDER BY problem_rating;`, [handle])
        ,4000);

    }catch(error){
        return null;
    }


    const Map_Rating = {};
    for(const c of result.rows){
        const rating = c.problem_rating;
        if(rating !== null){
            Map_Rating[rating] = parseInt(c.count);
        }
    }


    if(Object.keys(Map_Rating).length === 0){
        return {};
    }
    return Map_Rating;


}

export default Rating;