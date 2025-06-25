
const Topics = async (submission) => {
    const Map_Topic = {};
    try {
        for(const sub of submission){
            const tags = sub.problem.tags || [];
            for(const tag of tags){
                Map_Topic[tag] = (Map_Topic[tag] || 0)+1;
                
            }

        }
        return Map_Topic;
    } catch (error) {
        console.error("Error fetching topics data:", error);
        return null;
    }
}
export default Topics;