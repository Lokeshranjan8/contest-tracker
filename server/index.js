import dotenv from "dotenv";
dotenv.config();
import express  from "express";
const app= express();
const PORT= process.env.PORT || 3000;
import fetchcontest from './fetchcontest.js';
console.log(PORT)

app.get('/contest', async (req,res)=>{
    try{
        const contest = await fetchcontest();
        res.json(contest)

    }catch(err){
        res.status(500).json({error:"failed to connect"})
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
