const User = require("../models/emailModel");

exports.subscribeUser = async (req, res) => {
    try {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
            });

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