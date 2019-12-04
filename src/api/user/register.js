const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
    axios.get("https://auth.dampgang.com/user")
        .then(response => {
            const { user } = response.data;
            console.log(user)
        })
})


module.exports = router;

module.exports.load = () => {
    return true;
}