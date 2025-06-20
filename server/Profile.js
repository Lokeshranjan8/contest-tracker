import axios from "axios";
import pool from "./db.js"; 


const Profile = async(username) => {
    console.log("Fetching profile data...");

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
            try{
                await pool.query(
                    `INSERT INTO profiles (handle, rating, max_rating, avatar, rank, last_online)
                     VALUES ($1, $2, $3, $4, $5, $6)
                     ON CONFLICT (handle) DO NOTHING`,
                     [handle, rating, maxRating, avatar, rank, lastonline]
                )
                console.log("Profile data inserted successfully");

            }catch(error){
                console.error("Error inserting profile data:", error);
            }
        }
        const new_data = userdata.map(user => ({
            handle: user.handle,
            rating: user.rating || "Unrated",
            maxRating: user.maxRating || 0,
            avatar: user.titlePhoto || "https://static.codeforces.com/pictures/2020/01/01/default-avatar.png",
            rank: user.rank || "newbie",
            lastOnline: new Date(user.lastOnlineTimeSeconds * 1000).toLocaleString(),
        }));
        return new_data;
}

export default Profile;