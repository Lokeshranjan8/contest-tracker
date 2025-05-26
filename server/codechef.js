import axios from "axios";
import * as cheerio from "cheerio";

const codechefcontest = async() =>{
    const url = process.env.CODECHEF_API;
    try {
        const { data: html } = await axios.get(url);
        const $ = cheerio.load(html);

        const upcomingContests = [];

        const table = $("table").eq(1);

        table.find("tbody tr").each((i, row) => {
            const cols = $(row).find("td");
            const contest = {
                code: $(cols[0]).text().trim(),
                name: $(cols[1]).text().trim(),
                start: $(cols[2]).text().trim(),
                end: $(cols[3]).text().trim(),
            };
            upcomingContests.push(contest);
        });
        console.log("Upcoming CodeChef Contests:");
        console.log(upcomingContests);
        console.log(html);

    }catch(err){
        console.error("Error scraping CodeChef:", err.message);

    }
};

export default codechefcontest;