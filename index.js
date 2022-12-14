import express from "express";
import mongoose from "mongoose";
import config from 'config';
import cors from 'cors';

import resourcesRouter from './routes/resources.routes.js';
import usersRouter from './routes/users.routes.js';
import rolesRouter from './routes/roles.routes.js';
import authRouter from './routes/auth.routes.js';

const app = express();
const PORT = config.get('serverPort') || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', resourcesRouter);
app.use('/api', usersRouter);
app.use('/api', rolesRouter);
app.use('/auth', authRouter);

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
