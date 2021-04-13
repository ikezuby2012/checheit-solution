const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const emailSchema = new Schema({
    name: {
        type: "String",
        required: []
    }
})