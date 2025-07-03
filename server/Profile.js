import axios from "axios";
import pool from "./db.js"; 


const Profile = async(username) => {
    console.log("Fetching profile data...");
    const user_id = 38; 
    const existinguser = await pool.query(
        `SELECT * FROM profiles WHERE handle = $1`,
        [username]
    );
    if( existinguser.rows.length > 0){
        console.log("Profile already exists in the database.");
        return existinguser.rows[0];
    }

    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    const response = await axios.get(url);
    
        const userdata = response.data.result;
        for(const c of userdata){
            const handle = c.handle;
            const rating = c.rating || "Unrated";
            const maxRating = c.maxRating || 0;
            const avatar = c.titlePhoto || "https://static.codeforces.com/pictures/2020/01/01/default-avatar.png";
            const rank = c.rank || "newbie";
            const lastonline  = new Date(c.lastOnlineTimeSeconds * 1000).toLocaleString();
            try {
                await pool.query(
                    `INSERT INTO profiles (user_id, handle, rating, max_rating, avatar, rank, last_online)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)
                     ON CONFLICT (user_id) DO UPDATE 
                     SET handle = EXCLUDED.handle,
                         rating = EXCLUDED.rating,
                         max_rating = EXCLUDED.max_rating,
                         avatar = EXCLUDED.avatar,
                         rank = EXCLUDED.rank,
                         last_online = EXCLUDED.last_online
                   `,
                    [user_id, handle, rating, maxRating, avatar, rank, lastonline]
                );

            } catch(error){
                console.error("Error inserting profile data:", error);
            }
            console.log("Profile data inserted successfully.", username);
            return {
                handle,
                rating,
                maxRating,
                avatar,
                rank,
                lastOnline: lastonline
            };
        }
}

export default Profile;