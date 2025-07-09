/* eslint-disable no-undef */
import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.NEON_DB,
    ssl: {
        rejectUnauthorized: false,
    }
    
})

try{
    await pool.connect();
    console.log("Connected to the database successfully");

}catch (error) {
    console.error("Error connecting to the database:", error);
}


export default pool;