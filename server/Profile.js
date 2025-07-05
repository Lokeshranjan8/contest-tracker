import axios from "axios";
import pool from "./db.js"; 
import redisclient from "./redis.js";

const Profile = async(username) => {
    console.log("Fetching profile data...");

    const key = `codeforces:profile:${username}`;
    const cachedData = await redisclient.get(key);
    if(cachedData){
        console.log("returning the data from cache");
        return JSON.parse(cachedData);
    }
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
                    `INSERT INTO profiles (handle, rating, max_rating, avatar, rank, last_online)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     ON CONFLICT (handle) DO UPDATE 
                     SET rating = EXCLUDED.rating,
                         max_rating = EXCLUDED.max_rating,
                         avatar = EXCLUDED.avatar,
                         rank = EXCLUDED.rank,
                         last_online = EXCLUDED.last_online
                   `,
                    [handle, rating, maxRating, avatar, rank, lastonline]
                );

            } catch(error){
                console.error("Error inserting profile data:", error);
            }
        }

        const new_data = userdata.map(data => ({
            handle: data.handle,
            rating: data.rating,
            maxRating: data.maxRating,
            avatar: data.titlePhoto || "https://static.codeforces.com/pictures/2020/01/01/default-avatar.png",
            rank: data.rank,
            lastOnline: new Date(data.lastOnlineTimeSeconds * 1000).toLocaleString(),
        }));

        await redisclient.setEx(key, 1800, JSON.stringify(new_data));
        console.log("Cached  CF profile data in Redis.");
        return new_data;
}

export default Profile;