const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const colors = require("colors");

var totalRoutes = 0;
var loadedRoutes = [];
var failedRoutes = [];
function searchDir(subDir, currentDir) {
    currentDir = currentDir ? currentDir : __dirname;
    const dirToSearch = subDir ? path.join(currentDir, subDir) : currentDir;
    fs.readdirSync(dirToSearch, { withFileTypes: true }).forEach(x => {
        if (x.isFile()) {
            const file = path.join(dirToSearch, x.name);
            const extname = path.extname(file)
            const route = file.split("api")[1].replace(/\\/g, "/").replace(new RegExp(`${extname}|/index`, "g"), "");
            if (file === path.join(__dirname, "index.js")) return;
            if (extname !== ".js") return;
            totalRoutes++;

            try {
                const newRoute = require(file);
                if (!newRoute.load()) throw "loading-failed";
                router.use(route, newRoute)
            } catch (err) {
                if (err === "loading-failed" || err.message === "Router.use() requires a middleware function but got a Object") {
                    failedRoutes.push(route);
                    console.log("Failed to load:".red, route.red)
                    return;
                } else {
                    return console.log(err);
                }
            }

            loadedRoutes.push(route);
            console.log("Loaded:".green, route.green)

        } else if (x.isDirectory()) {
            searchDir(x.name, dirToSearch)
        }
    })
}

console.log("Loading routes...".yellow)
searchDir();
console.log(`Successfully loaded ${loadedRoutes.length}/${totalRoutes} routes!`.green)
if (failedRoutes.length !== 0) {
    console.log(`Failed to load ${failedRoutes.length} routes:`.red)
    failedRoutes.forEach(x => {
        console.log(`\t${x}`.yellow);
    })
}

module.exports = router;