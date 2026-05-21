import express from 'express';
import {emailQueue} from './queue.js'


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/welcome-email", async (req, res) => {
    const job = await emailQueue.add('send-welcome-email', 
        {
            to: req.body.to,
            name: req.body.name || "Learner"
        },
        {
            attemps: 3,
            backoff: {
                type: "exponential",
                delay: 1000
            },
        }
    );
   // console.log("Job...", job);
    res.json({message: `Welcome email job added to the queue! JobId: ${job.queue.keys.id}, and name: ${job.queue.name}`});

});


app.listen(3000, () => {
    console.log("Server is running on http://loclahost:3000");
});