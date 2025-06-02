import axios from "axios"

const fetchcontest = async(type ="upcoming") =>{
    
    const url = process.env.CODEFORCES_API;
    const {data} = await axios.get(url);
    
    try {
        const contests = data.result;
        const now = Math.floor(Date.now() / 1000);

        let filteredContests;
        if (type === "upcoming") {
            filteredContests = contests.filter(contest => contest.startTimeSeconds > now);
        } else {
            filteredContests = contests.filter(contest => contest.startTimeSeconds <= now);
        }
        const sortedContests = filteredContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
        const upcomingContests = sortedContests.slice(0, 2).map(contest => {
            const durationSeconds = contest.durationSeconds;
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const formattedDuration = `${hours} hr ${minutes} min`;

            return {
                name: contest.name,
                platform: "Codeforces",
                startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
                duration: formattedDuration,
                url: `https://codeforces.com/contests/${contest.id}`,
            }
        })
        return upcomingContests;

    }
    catch(error){
        throw new Error("Failed to fetch contests");
    }
    
};

export default fetchcontest;
