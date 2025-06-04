import dotenv from "dotenv";
dotenv.config();

import express  from "express";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";
const app= express();
app.use(express.json());
app.use(cors())

const PORT= process.env.PORT || 3000;
import fetchcontest from './fetchcontest.js';
import fetchLeetCodeContests from "./leetcode.js";

// ollama run gemma:2b
app.post("/analyze", async (req, res) => {
    const { prompt } = req.body;
    console.log("Received link:", prompt);

    try {
        const html = await axios.get(prompt).then(res => res.data);
        const $ = cheerio.load(html);

        const title = $(".problem-statement .title").first().text();
        const description = $(".problem-statement .problem-description").text();
        const inputSpec = $(".problem-statement .input-specification").text();
        const outputSpec = $(".problem-statement .output-specification").text();
        const sampleTests = $(".problem-statement .sample-test").text();

        const fullProblemText = `
Problem Title: ${title}

Description:
${description}

Input Specification:
${inputSpec}

Output Specification:
${outputSpec}

Sample Testcases:
${sampleTests}

Instructions:
1. Explain the problem briefly.
2. Suggest a solving approach with reasoning.
3. Mention the expected time and space complexity.
4. Provide a C++ solution with comments.
        `;

        const ollamaRes = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gemma:2b",  // You can change to "codellama" for better C++ output
                prompt: fullProblemText,
                stream: false
            }),
        });

        const data = await ollamaRes.json();
        res.json({ response: data.response });
        console.log("AI Response:", data.response);

    } catch (err) {
        console.error("Error in processing:", err);
        res.status(500).json({ error: "Failed to fetch or process the problem." });
    }
});

app.get('/upcoming', async (req,res)=>{
    try{
        const contest = await fetchcontest("upcoming");
        console.log("Backend /upcoming contest data:", contest);
        res.json(contest)
    }catch(err){
        res.status(500).json({error:"failed to connect"})
    }
})
app.get('/past', async (req,res)=>{
    try{
        const contest = await fetchcontest("past");
        res.json(contest)
    }catch(err){
        res.status(500).json({error:"failed to connect"})
    }
})

app.get('/leetcode', async (req,res)=>{
    try{
        const contest = await fetchLeetCodeContests();
        res.json(contest)
    } catch(err){
        res.status(500).json({error:"failed to connect leetcode server "})
    }

})

// app.get('/codechef', async(req,res) =>{
//     try{
//         const contest = await codechefcontest();
//         res.json(contest)
//     }catch(err){
//         res.status(500).json({error:"failed to connect codechef server"})
//     }
// })

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})