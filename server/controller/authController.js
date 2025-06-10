import pool from  "../db.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/GenerateToken.js";


export const signup = async(req,res)=>{
    const {email,password} = req.body;
    try{
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if(userExist.rows.length>0){
            return res.status(400).json({message: "User already exists"});
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO  (email, password) VALUES ($1, $2) RETURNING id",
            [email, hashpassword]
        );
        const token = generateToken(newUser.rows[0].id);
        res.status(201).json({message: "User created successfully", token});
    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }

}

export const login = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await pool.query("SELECT * FROM users WHERE emaill = $1", [email]);
        if(user.rows.length === 0) {
            return res.status(404).json({message: "Invalid credentials"});
        }
        const Valid = await bcrypt.compare(password, user.row[0].password);
        if(!Valid){
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = generateToken(user.rows[0].id);
        res.status(200).json({message: "Login successful", token});

    }catch(error){
        res.status(500).json({message: "Server error", error: error.message});
    }
}

