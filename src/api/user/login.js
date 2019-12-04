const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
    const { email, password } = req.body;
})


module.exports = router;

module.exports.load = () => {
    return true;
}