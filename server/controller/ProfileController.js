import Profile from "../Profile.js";
import Rating from "../utils/Rating.js";
import Submission from "../utils/Submission.js";
import Topic from "../utils/Topics.js";

const ProfileController = async (req, res) => {
    const handle = req.params.username;
    try{
        const userProfile = await Profile(handle);
        //console.log("User Profile: one 1st step done", userProfile);
        if (!userProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        const userSubmission = await Submission(handle);
        const userSubmissionCount = userSubmission.length;
        //console.log("User Submission Count:", userSubmissionCount);
        if (!userSubmission) {
            return res.status(404).json({ error: "Submissions not found" });
        }
        const userRating = await Rating(handle);
        if (!userRating) {
            return res.status(404).json({ error: "Rating not found" });
        }
        const userTopic = await Topic(handle);
        //console.log("User Topic: one 2nd step done", userTopic);
        

        const response = {
            profile: userProfile,
            problemsolved: userSubmissionCount,
            topics: userTopic,
            rating: userRating
        }
        console.log("Final Response:", response);
        res.status(200).json(response);
    }catch (err) {
        console.error("Profile fetch failed:", err.message);
        res.status(500).json({ error: "Failed to fetch full profile" });
    }

}
export default ProfileController;