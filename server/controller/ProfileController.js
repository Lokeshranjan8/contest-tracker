import Profile from "../utils/Profile.js";
import Rating from "../utils/Rating.js";
import Submission from "../utils/Submission.js";
import Topic from "../utils/Topics.js";
import redisclient from "../Caching/redis.js";


const ProfileController = async (req, res) => {
    const handle = req.params.username;
    const key = `profiles:${handle}`;
    const cacheData = await redisclient.get(key);


    if(cacheData){
        return res.status(200).json(JSON.parse(cacheData));
    }

    try{

        if(!handle){
            res.status(400).json({ error: "Username parameter is missing" });
            return;
        }

        const userProfile = await Profile(handle);
        const userSubmission = await Submission(handle);
        
        const [  userRating, userTopic] = await Promise.all([
            Rating(handle),
            Topic(handle)
        ])

        const totalSolved= Object.values(userRating).reduce((a,b) => a + b, 0);
        

        const response = {
            profile: userProfile,
            problemsolved: totalSolved,
            topics: userTopic,
            rating: userRating
        }
        await redisclient.setEx(key,100, JSON.stringify(response));
        res.status(200).json(response);
        
    }catch (err) {
        res.status(500).json({ error: "Failed to fetch full profile" });
    }

}
export default ProfileController;