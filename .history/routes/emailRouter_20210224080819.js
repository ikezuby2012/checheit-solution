const express = require("express");

const { subscribeUser } = require("../controller/emailController");
const router = express.Router();

router.route("/sendEmail").post(subscribeUser);

m
