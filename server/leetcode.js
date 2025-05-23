import axios from "axios";

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
    const upcomingContests = sortedContests.slice(0, 5).map(c => ({
        name: c.title,
        platform: "LeetCode",
        startTime: new Date(c.startTime * 1000).toLocaleString(),
        duration: `${Math.floor(c.duration / 3600)} hr ${Math.floor((c.duration % 3600) / 60)} min`,
        link: `https://leetcode.com/contest/${c.titleSlug}`
    }));

    return upcomingContests;
   } catch (error) {
    throw new Error("Failed to fetch LeetCode contests");
   }
};

export default fetchLeetCodeContests;