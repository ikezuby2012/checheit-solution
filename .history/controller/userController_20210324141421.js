const User = require("../models/userModel");
const Email = require("../utils/email");

const catchAsync = fn =>
    (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    };

exports.subscribeUser = catchAsync(async (req, res) => {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
            });

            console.log(newUser);
            await new Email(newUser).sendWelcome();

            res.status(200).json({
                status: "success",
                data: {
                    data: newUser
                }
            });
});