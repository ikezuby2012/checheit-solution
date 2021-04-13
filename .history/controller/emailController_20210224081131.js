const Email = require("../models/emailModel");

exports.subscribeUser = async (req, res) => {
    try {
            const newUser = await Email.create({
                name: req.body.name,
                email: req.body.email,
            });

            res.status(200).json({
                status: ""
            });
    }catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}