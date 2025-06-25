import Profile from "../Profile.js";
import Rating from "../utils/Rating.js";
import Submission from "../utils/Submission.js";
import Topic from "../utils/Topics.js";

const ProfileController = async (req, res) => {
    const handle = req.params.username;
    try{
        const userProfile = await Profile(handle);
        if (!userProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        const userSubmission = await Submission(handle);
        const userSubmissionCount = userSubmission.length;
        if (!userSubmission) {
            return res.status(404).json({ error: "Submissions not found" });
        }
        const userRating = await Rating(handle);
        if (!userRating) {
            return res.status(404).json({ error: "Rating not found" });
        }
        const userTopic = await Topic(userSubmission);
        

        const response = {
            profile: userProfile[0],
            problemsolved: userSubmissionCount,
            topics: userTopic,
            rating: userRating
        }
        res.status(200).json(response);



    }catch (err) {
        console.error("Profile fetch failed:", err.message);
        res.status(500).json({ error: "Failed to fetch full profile" });
    }

}
export default ProfileController;