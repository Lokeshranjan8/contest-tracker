import cluster from 'cluster';
import cpus from 'os';
import process from 'process';
import app from './index.js';

const numCPUs = cpus.cpus().length;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    
    for(let i=0; i<numCPUs; i++){
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    app.listen(3000, () => {
        console.log(`Worker ${process.pid} is listening on port 3000`);
    });
}