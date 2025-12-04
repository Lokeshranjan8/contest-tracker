import dotenv from "dotenv";
dotenv.config();

import express  from "express";
import cors from "cors";
import "./Cron/CronJob.js";


const app= express();
// app.use(cors({
//   origin: "*", // ⚠️ Allow all origins — only for testing
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use(express.json());



// eslint-disable-next-line no-undef
const PORT= process.env.PORT || 5000;
import fetchcontest from './fetchcontest.js';
import fetchLeetCodeContests from "./leetcode.js";
import authRoutes from './routes/auth.js';
import Profile from "./Profile.js";
import ProfileCF from "./routes/ProfileCF.js";

// eslint-disable-next-line no-undef
app.post("/analyze", async (req, res) => {
    const { prompt,intent } = req.body;
    console.log("Received link:", prompt);
    console.log("Received intent:", intent);
    const myprompt = `You are an assistant. Your task is to ${intent}.\n\nHere is the problem:\n${prompt}`;


    try {
        
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" ,
                // eslint-disable-next-line no-undef
                "Authorization": `Bearer ${process.env.GROQ_CF_API}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: myprompt }
                ]
            }),
        });

        const data = await groqRes.json();
        const aiReply = data.choices[0]?.message?.content || "No response from AI";
        console.log("AI Response:", aiReply);
        res.json({ response: aiReply });

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
    // eslint-disable-next-line no-unused-vars
    }catch(err){
        res.status(500).json({error:"failed to connect"})
    }
})
app.get('/past', async (req,res)=>{
    try{
        const contest = await fetchcontest("past");
        res.json(contest)
    // eslint-disable-next-line no-unused-vars
    }catch(err){
        res.status(500).json({error:"failed to connect"})
    }
})

app.get('/leetcode', async (req,res)=>{
    try{
        const contest = await fetchLeetCodeContests();
        res.json(contest)
    } catch(error){
        console.error("Error fetching leetcode data:", error);
        res.status(500).json({ error:"failed to connect leetcode server "})
    }

})


app.get('/', async(req,res)=>{
    res.send("Welcome to Contest Tracker API")
})

app.use('/', ProfileCF);

app.use('/auth', authRoutes);

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`server is running on port ${PORT}`)
})

export default app;