import axios from "axios"

const fetchcontest = async() =>{
    
    const url = process.env.CODEFORCES_API;
    const {data} = await axios.get(url);
    
    try{
        const contests = data.result;
        const filteredContests = contests.filter(contest => contest.phase === "BEFORE" || contest.phase === "CODING");
        const sortedContests = filteredContests.sort((a, b) => new Date(a.startTimeSeconds * 1000) - new Date(b.startTimeSeconds * 1000));
        const upcomingContests = sortedContests.slice(0, 5).map(contest =>{
            const durationSeconds = contest.durationSeconds;
            const hours = Math.floor(durationSeconds / 3600);
            const minutes = Math.floor((durationSeconds % 3600) / 60);
            const formattedDuration = `${hours} hr ${minutes} min`;

            return{
                name: contest.name,
                platform: "Codeforces",
                startTime: new Date(contest.startTimeSeconds * 1000).toLocaleString(),
                duration: formattedDuration,
                url: `https://codeforces.com/contests/${contest.id}`,
            }
        })
        return upcomingContests;
        
    } catch(error){
        throw new Error("Failed to fetch contests");
    }
    
};

export default fetchcontest;
