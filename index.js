const express = require("express");
const app = express();
const mongoose = require("mongoose");
const colors = require("colors");
const { api, utils } = require("./src");
const { config } = utils;

if (config.node_env === "production") {
    app.use(express.public("client"))
}

app.use(express.json());
app.use(api);

const { uri, options } = config.mongoose;
mongoose.connect(uri, options)
    .then(() => console.log("Successfully connected to database!".green))
    .catch(err => console.log("Failed to connect to database:".red, err.message))

app.listen(config.port, () => {
    console.log(`Server started in ${config.node_env}`)
})