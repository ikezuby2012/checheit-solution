const mongoose = require("mongoose");
const validator = require("validator");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    name: {
        type: "String",
        required: [true, "a user must have an email"],
        minLength: [1, "must have more than one character"],
        maxLength: [25, "your name is too long"]
    },
    email: {
        type: String,
        required: [true, "please provide your email address!"],
        unique: true,
        lowerCase: true,
        //validate: [validator.isEmail, "please provide a valid email"]
    }
})
const User = model("User", userSchema);
module.exports = User;