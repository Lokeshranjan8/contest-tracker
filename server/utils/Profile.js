import axios from "axios";
import pool from "../DB/db.js"; 
import redisclient from "../Caching/redis.js";
import {timeoutp} from "./Timeout.js";

const Profile = async(username) => {

    const existinguser = await pool.query(
        `SELECT * FROM profiles WHERE handle = $1`,
        [username]
    );

    if( existinguser.rows.length > 0){
        return existinguser.rows[0];
    }


    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    let response;
    try{
        response = await timeoutp(axios.get(url), 5000); 
    }catch(error){
        console.error("Error fetching profile data from Codeforces API:");
        throw error;
    }
    
        const userdata = response.data.result;
        for(const c of userdata){
            const handle = c.handle;
            const rating = c.rating || 0;
            const maxRating = c.maxRating || 0;
            const avatar = c.titlePhoto || "";
            const rank = c.rank || "newbie";
            const lastonline = c.lastOnlineTimeSeconds? new Date(c.lastOnlineTimeSeconds*1000) : null;

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
            rating: data.rating || 0,
            max_rating: data.maxRating || 0,
            avatar: data.titlePhoto || "",
            rank: data.rank || "newbie",
            last_online: data.lastOnlineTimeSeconds? new Date(data.lastOnlineTimeSeconds*1000) : null

        }));

        return new_data[0];

};

export default Profile;