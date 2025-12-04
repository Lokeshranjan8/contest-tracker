import axios from "axios";
import pool from "./db.js"; 
import redisclient from "./redis.js";
import {timeoutp} from "./utils/Timeout.js";

const Profile = async(username) => {
    console.log("Fetching profile data In Profile.js for:", username);
    const key = `codeforces:profile:${username}`;


    // Check Redis Cache

    const cachedData = await redisclient.get(key);
    if(cachedData){
        console.log("returning the data from cache");
        return JSON.parse(cachedData);
    }

    // Check in Postgres DB

    const existinguser = await pool.query(
        `SELECT * FROM profiles WHERE handle = $1`,
        [username]
    );

    if( existinguser.rows.length > 0){
        console.log("Profile already exists in the database.");
        await redisclient.setEx(key, 180, JSON.stringify(existinguser.rows));
        return existinguser.rows[0];
    }


    const url = `https://codeforces.com/api/user.info?handles=${username}`;
    let response;
    try{
        response = await timeoutp(axios.get(url), 5000); 
    }catch(error){
        console.error("Error fetching profile data from Codeforces API:", error);
        throw error;
    }
    
        const userdata = response.data.result;
        for(const c of userdata){
            const handle = c.handle;
            const rating = c.rating || "Unrated";
            const maxRating = c.maxRating || 0;
            const avatar = c.titlePhoto || "https://static.codeforces.com/pictures/2020/01/01/default-avatar.png";
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
            rating: data.rating,
            maxRating: data.maxRating,
            avatar: data.titlePhoto || "https://static.codeforces.com/pictures/2020/01/01/default-avatar.png",
            rank: data.rank,
            lastonline: data.lastOnlineTimeSeconds? new Date(data.lastOnlineTimeSeconds*1000) : null

        }));

        await redisclient.setEx(key, 180, JSON.stringify(new_data));
        console.log("Cached  CF profile data in Redis.");

        return new_data;

};

export default Profile;