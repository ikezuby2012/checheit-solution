const express = require("express");

const { subscribeUser } = require("../controller/userController");
const router = express.Router();

router.route("/sendEmail").post(subscribeUser);

module.exports = router;
