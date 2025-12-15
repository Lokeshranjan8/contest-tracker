import axios from "axios";
import pool from "./DB/db.js"; 
import redisclient from "./Caching/redis.js";


const fetchLeetCodeContests = async()=> {
  const query = {
    query: `
      {
        allContests {
          title
          startTime
          duration
          titleSlug
        }
      }
    `
  };

  const key = `leetcode:upcoming`;
  const cachedData = await redisclient.get(key);
  if (cachedData) {
    console.log("Returning the data from cache");
    return JSON.parse(cachedData);
  }
  console.log("Fetching data from api as no cache found");

  try {
    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const now = Math.floor(Date.now() / 1000);
    const contests = response.data.data.allContests;
    const filteredContests = contests.filter(contest => contest.startTime > now);
    const sortedContests = filteredContests.sort((a, b) =>  new Date(a.startTime * 1000) - new Date(b.startTime * 1000));
    const upcomingContests = sortedContests.slice(0, 10);
    for (const c of upcomingContests) {
      const title = c.title;
      const platform = "LeetCode";
      const start_time  = new Date(c.startTime * 1000).toLocaleString();
      const duration = `${Math.floor(c.duration / 3600)} hr ${Math.floor((c.duration % 3600) / 60)} min`;
      const link = `https://leetcode.com/contest/${c.titleSlug}`;

      try {
        await pool.query(
          `INSERT INTO contests (title, platform, start_time, duration, link)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (title, platform) DO NOTHING`,
          [title, platform, start_time, duration, link]
        );
        console.log("LEETCODE data inserted successfully");
      } catch (error) {
        console.error("Error inserting contest data:", error);
      }
    }

    const result =  upcomingContests.map(c => ({
        name: c.title,
        platform: "LeetCode",
        startTime: new Date(c.startTime * 1000).toLocaleString(),
        duration: `${Math.floor(c.duration / 3600)} hr ${Math.floor((c.duration % 3600) / 60)} min`,
        url: `https://leetcode.com/contest/${c.titleSlug}`
    }));
    await redisclient.setEx(key, 30, JSON.stringify(result));
    console.log("Cached LeetCode contests in Redis.");
    return result;


   // eslint-disable-next-line no-unused-vars
   } catch (error) {
    throw new Error("Failed to fetch LeetCode contests");
   }
};

export default fetchLeetCodeContests;