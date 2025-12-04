import Profile from "../Profile.js";
import Rating from "../utils/Rating.js";
import Submission from "../utils/Submission.js";
import Topic from "../utils/Topics.js";

const ProfileController = async (req, res) => {
    const handle = req.params.username;

    try{

        console.log("Starting to fetch full profile for:");
        if(!handle){
            res.status(400).json({ error: "Username parameter is missing" });
            return;
        }
    
        const [ userProfile, userSubmission, userRating, userTopic] = await Promise.all([
            Profile(handle),
            Submission(handle),
            Rating(handle),
            Topic(handle)
        ])

        const totalSolved = Object.values(userRating).reduce((sum, count) => sum + count, 0);
        

        const response = {
            profile: userProfile,
            problemsolved: totalSolved,
            topics: userTopic,
            rating: userRating
        }
        res.status(200).json(response);
        
    }catch (err) {
        res.status(500).json({ error: "Failed to fetch full profile" });
    }

}
export default ProfileController;