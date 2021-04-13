const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const emailSchema = new Schema({
    name: {
        type: "String",
        required: [true, "a user must have an email"],
        minLength: 
    }
})