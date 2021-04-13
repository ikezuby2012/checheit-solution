const User = require("../models/userModel");
const Email = require("../utils/email");

exports.subscribeUser = async (req, res) => {
    try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
            });

            console.log(req.body);
            await new Email(newUser).sendWelcome();

            res.status(200).json({
                status: "success",
                data: {
                    data: newUser
                }
            });
    }catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}