/* eslint-disable no-undef */
import pkg from 'pg';
const {Pool} = pkg;
import dotenv from 'dotenv';
dotenv.config();

//for deployment to neon
// const pool = new Pool({
//     connectionString: process.env.NEON_DB,
//     ssl: {
//         rejectUnauthorized: false,
//     }
    
// })



//local development
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    // ssl:{
    //     rejectUnauthorized: true,
    // }
});


try{
    await pool.connect();
    console.log("Connected to the database successfully");

}catch (error) {
    console.error("Error connecting to the database:", error);
}


export default pool;