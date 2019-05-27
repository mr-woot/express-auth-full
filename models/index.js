const mongo = require("mongoose");

// User schema
const userSchema = require("./user");
const User = mongo.model('User', userSchema);

module.exports = {
    User
};