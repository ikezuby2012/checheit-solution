const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const compression = require("compression");
const cors = require("cors");
const bodyParser = require("body-parser")
const AppError = require("./utils/AppError")
const emailRouter = require("./routes/userRouter");

dotenv.config({path: "./config.env"});

const app = express();

// cors config
app.use(cors());
app.use(express.json({limit: "10kb"}));
app.use(bodyParser.urlencoded({extended: true}));

//<-- serving static files
app.use(express.static(path.join(`${__dirname}`, "public")));

app.use(compression());

if(process.env.NODE_ENV === 'production') {
    mongoose.connect(process.env.DATABASE_MONGO, {
        useNewUrlParser: true,
useUnifiedTopology: true
        //useCreateIndex: true,
        //useFindAndModify: false
    }).then(() => {
        console.log(`mongoDB atlas connected successfully!`);
    });
} else {
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`DB connected successfully!`)
});
}


app.use(`/api/v1/mail`, emailRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`now listening to port ${PORT}....`);
});

process.on("unhandledRejection", err => {
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
//error handling
const handleSendMailError = () => new AppError("connecting to send mail service failed!");

const handleDuplicateErrorDB = err => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    // console.log(value);
    const message = `duplicate field value ${value}. please provide another value`;
    return new AppError(message, 400);
};

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err
    });

    if (process.env.NODE_ENV === "development") {
        let error = {...err};
        error.message = err.message;
        if (error.code === 11000) handleDuplicateErrorDB(error);
        if (error.errno === -3008) handleSendMailError();
    }
});

module.exports = app;