const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser")
const AppError = require("./utils/AppError")

const emailRouter = require("./routes/userRouter");

dotenv.config({path: "./config.env"});

const app = express();

app.use(express.json({limit: "10kb"}));
app.use(bodyParser.urlencoded({ extended: true}));

//<-- serving static files
app.use(express.static(path.join(`${__dirname}`, "public"))); 

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`DB connected successfully!`)
});

app.use(`/api/v1/mail`, emailRouter);

const PORT = 5000 || process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`now listening to port ${PORT}....`);
});

process.on("unhandledRejection", err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//error handling
const handleSendMailError = () => {

};
const handleDuplicateErrorDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    console.log(value);
    const message = `duplicate field value ${value}. please provide another value`;
    return new AppError(message, 400);
};

app.use((err, req, res, next) => {
    if(process.env.NODE_ENV === "development") {
        let error = {...err};
        error.message = err.message;
        if (error.code === 11000) handleDuplicateErrorDB(error);
    }
});

module.exports = app;