import axios from "axios";
import pool from "./db.js"; 

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

    return upcomingContests.map(c => ({
        name: c.title,
        platform: "LeetCode",
        startTime: new Date(c.startTime * 1000).toLocaleString(),
        duration: `${Math.floor(c.duration / 3600)} hr ${Math.floor((c.duration % 3600) / 60)} min`,
        url: `https://leetcode.com/contest/${c.titleSlug}`
    }));

   } catch (error) {
    throw new Error("Failed to fetch LeetCode contests");
   }
};

export default fetchLeetCodeContests;