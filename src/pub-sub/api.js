import Redis from 'ioredis';
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const publisher = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

app.post("/notifications", async (req, res) => {
    const payload = {
        title: req.body.title || "Default Title",
        createdAt: new Date().toISOString()
    };

    const receivers = await publisher.publish("notifications", JSON.stringify(payload));

    res.json({message: `Notification sent to ${receivers} subscribers`});
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});