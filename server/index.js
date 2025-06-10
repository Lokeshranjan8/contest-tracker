import dotenv from "dotenv";
dotenv.config();

import express  from "express";
import cors from "cors";

const app= express();
app.use(express.json());
app.use(cors())

const PORT= process.env.PORT || 3000;
import fetchcontest from './fetchcontest.js';
import fetchLeetCodeContests from "./leetcode.js";
import authRoutes from './routes/auth.js';

// ollama run gemma:2b
app.post("/analyze", async (req, res) => {
    const { prompt,intent } = req.body;
    console.log("Received link:", prompt);
    console.log("Received intent:", intent);
    const myprompt = `You are an assistant. Your task is to ${intent}.\n\nHere is the problem:\n${prompt}`;


    try {
        
        const ollamaRes = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gemma:2b", 
                prompt: myprompt,
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

app.use('/auth', authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})