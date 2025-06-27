import pool from '../db.js';

const Topics = async (handle) => {
    const Map_Topic = {};
    const userresult = await pool.query(`SELECT user_id FROM profiles WHERE handle = $1`, [handle]);
    const user_id = userresult.rows[0].user_id;

    try {
        const result = await pool.query(`
            SELECT tag, COUNT(*) AS count
            FROM (
                SELECT unnest(tags) AS tag
                FROM ac_sub
                WHERE user_id = $1
            ) AS exploded_tags
            GROUP BY tag
            ORDER BY count DESC;
        `, [user_id]);

        for (const row of result.rows) {
            const topic = row.tag;
            Map_Topic[topic] = parseInt(row.count);
        }

        return Map_Topic;
    } catch (error) {
        console.error("Error fetching topics data:", error);
        return null;
    }
}
export default Topics;