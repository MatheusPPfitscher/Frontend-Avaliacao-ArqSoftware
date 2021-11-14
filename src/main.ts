import express from 'express';

const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/../public"));

const port = process.env.PORT || 8081;

app.listen(port, () => console.log("Server is running on " + port));
