const Email = require("../models/emailModel");

exports.subscribeUser = async (req, res) => {
    try {
            const newUser = await
    }catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message
        })
    }
}