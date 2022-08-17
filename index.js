import express from "express";

const PORT = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('yep');
})

app.listen(PORT, () => console.log(`SERVER STARTED ON ${PORT} PORT`));
