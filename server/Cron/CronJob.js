import cron from 'node-cron';
import fetchcontest from '../fetchcontest.js';

cron.schedule('0 */6 * * *', async () => {
    console.log("Running cron job to fetch contests...");
    try {
        await fetchcontest("upcoming", true);
        console.log("Contests fetched and stored successfully.");
        
    } catch (error) {
        console.error("Error fetching contests:", error);
    }
})