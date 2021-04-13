const User = require("../models/userModel");
const Email = require("../utils/email");



exports.subscribeUser = catchAsync( async (req, res, next) => {
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
            });

            console.log(newUser);
            await new Email(newUser).sendWelcome();

            res.status(200).json({
                status: "success",
                data: {
                    user: newUser
                }
            });
});