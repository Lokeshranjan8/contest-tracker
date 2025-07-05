import pool from '../db.js';
import redisclient from '../redis.js';

const Topics = async (handle) => {
    const Map_Topic = {};
   
    const key = `codeforces;topics:${handle}`;
    const cacheData = await redisclient.get(key);
    if(cacheData) {
        console.log("Returning the data from cache");
        return JSON.parse(cacheData);
    }

    try {
        const result = await pool.query(`
            SELECT tag, COUNT(*) AS count
            FROM (
                SELECT unnest(tags) AS tag
                FROM ac_sub
                WHERE handle = $1
            ) AS exploded_tags
            GROUP BY tag
            ORDER BY count DESC;
        `, [handle]);

        for (const row of result.rows) {
            const topic = row.tag;
            Map_Topic[topic] = parseInt(row.count);
        }
        await redisclient.setEx(key, 1800, JSON.stringify(Map_Topic));
        return Map_Topic;
    } catch (error) {
        console.error("Error fetching topics data:", error);
        return null;
    }
}
export default Topics;