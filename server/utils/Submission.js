import axios from "axios";

const Submission = async (handle) => {
    const url = `https://codeforces.com/api/user.status?handle=${handle}`;
    const response = await axios.get(url);
    try{
        const submission_data = response.data.result;
        const ac = submission_data.filter(x => x.verdict === "OK");
        return ac;
    }catch(error){
        console.error("Error fetching submission data:", error);
        return null;
    }

}
export default Submission;