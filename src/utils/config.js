if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    mongoose: {
        uri: process.env.MONGO_URI || "",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }
}