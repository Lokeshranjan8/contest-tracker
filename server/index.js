import dotenv from "dotenv";
dotenv.config();
import express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app= express();
const PORT= process.env.PORT || 3000;
import fetchcontest from './fetchcontest.js';
import fetchLeetCodeContests from "./leetcode.js";
import codechefcontest from "./codechef.js";

app.use(cors());
app.use(bodyParser.json());

app.post("/analyze", async (req, res) => {
    const { prompt } = req.body;

    try {
        const ollamaRes = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "llama3",  // make sure you have pulled this model
                prompt: prompt,
                stream: false
            }),
        });

        const data = await ollamaRes.json();
        res.json({ response: data.response });

    } catch (err) {
        console.error("Error talking to Ollama:", err);
        res.status(500).json({ error: "Failed to contact Ollama" });
    }
});






app.get('/codeforce', async (req,res)=>{
    try{
        const contest = await fetchcontest();
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

app.get('/codechef', async(req,res) =>{
    try{
        const contest = await codechefcontest();
        res.json(contest)
    }catch(err){
        res.status(500).json({error:"failed to connect codechef server"})
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})




