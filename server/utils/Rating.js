const Topic = async (submission) => {
    const Map_Rating = {};
    try{
        for(const sub of submission){
            const ratings = sub.problem.rating ;
            for(const rating of ratings){
                Map_Rating[rating] = (Map_Rating[rating] || 0) + 1;
            }
        }
        return Map_Rating;

    }catch(error){
        console.error("Error fetching topics data:", error);
        return null;
    }

}
export default Topic;