import pool from '../db.js';

const Topics = async (handle) => {
    const Map_Topic = {};

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

        return Map_Topic;
    } catch (error) {
        console.error("Error fetching topics data:", error);
        return null;
    }
}
export default Topics;