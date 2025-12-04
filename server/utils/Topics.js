import pool from '../db.js';
import redisclient from '../redis.js';
import { timeoutp } from './Timeout.js';


const Topics = async (handle) => {
    if (!handle) throw new Error("Handle is required");
  
    // Redis cache check
    const key = `codeforces:topics:${handle}`;
    const cacheData = await redisclient.get(key);
    if(cacheData) {
        return JSON.parse(cacheData);
    }
    

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
    
    await redisclient.setEx(key, 300, JSON.stringify(Map_Topic));
    return Map_Topic;

}

export default Topics;