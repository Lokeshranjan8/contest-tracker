import axios from "axios";
import pool from '../DB/db.js';
import { timeoutp } from "./Timeout.js";


const Submission = async (handle) => {
    const url = `https://codeforces.com/api/user.status?handle=${handle}`;



    let response;
    try {
        response = await timeoutp(axios.get(url), 4000);

    } catch (error) {
        throw error;
    }

    const submission_data = response.data.result;
    const ac = submission_data.filter(x => x.verdict === "OK");
    const mydata = [];


    for (const c of ac) {
        const contest_id = c.contestId;
        const problem_index = c.problem.index;
        const creationTimeSeconds = c.creationTimeSeconds;
        const creation_time = new Date(creationTimeSeconds * 1000);
        const problem = c.problem;
        const problem_rating = problem.rating || null;
        const problem_tags = problem.tags || [];



        mydata.push({
            contest_id,
            problem_index,
            handle,
            creation_time,
            problem_rating,
            problem_tags
        });
    }
    if (mydata.length === 0) {
        return [];
    }

    for (const c of mydata) {
        await pool.query(
            `INSERT INTO ac_sub (contest_id,problem_index, handle, creation_time, problem_rating, tags)
                 VALUES ($1, $2, $3, $4, $5, $6)
                 ON CONFLICT (handle,contest_id,problem_index) DO NOTHING`,
            [c.contest_id, c.problem_index, c.handle, c.creation_time, c.problem_rating, c.problem_tags]
        );
    }

    return mydata;

}

export default Submission;