import express from "express";
import mongoose from "mongoose";
import config from 'config';

import resourcesRouter from './routes/resources.routes.js';

const app = express();
const PORT = config.get('serverPort') || 5000;

app.use(express.json());
app.use('/api', resourcesRouter);

const startServer = async() => {
    try {
        mongoose.connect(config.get('DBUrl'));

        app.listen(PORT, () => {
            console.log(`SERVER STARTED ON ${PORT} PORT`)
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();
