import pool from '../DB/db.js';
import { timeoutp } from './Timeout.js';


const Topics = async (handle) => {
    if (!handle) throw new Error("Handle is required");

    let result;
    try {
        result = await timeoutp(
            pool.query(`
            SELECT tag, COUNT(*) AS count
            FROM (
                SELECT unnest(tags) AS tag
                FROM ac_sub
                WHERE handle = $1
            ) AS exploded_tags
            GROUP BY tag
            ORDER BY count DESC;
            `, [handle]),4000);
    }catch (error) {
        return null;
    }


    const Map_Topic = {};

    for (const row of result.rows) {
        const topic = row.tag;
        Map_Topic[topic] = parseInt(row.count);
    }
    
    return Map_Topic;

}

export default Topics;