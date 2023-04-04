const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const route = require("./route/routes");

app.use(express.json());

app.use("/",route);

module.exports = app;