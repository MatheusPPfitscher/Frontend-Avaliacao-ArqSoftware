import express from 'express';
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/../public"));


app.listen(process.env.PORT, () => console.log("Server is running on " + process.env.PORT));
