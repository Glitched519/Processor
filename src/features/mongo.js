const mongoose = require("mongoose");
const config = require("../config.json");

module.exports = async () => {
    await mongoose.connect(config["mongo-path"], {
        autoCreate: false,
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return mongoose;
};
