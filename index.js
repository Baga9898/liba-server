import express from "express";
import mongoose from "mongoose";
import config from 'config';


const app = express();
const PORT = config.get('serverPort') || 5000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('yep');
})

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT} PORT`));
