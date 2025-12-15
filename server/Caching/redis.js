import {createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
  // eslint-disable-next-line no-undef
  url: process.env.REDIS_URL,
});
redisClient.on('error',(err) =>{
    console.error('Redis Client Error', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

export default redisClient;
