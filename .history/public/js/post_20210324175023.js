import axios from "axios";

import { showAlert } from "./alerts";

export const post = async (name, email) => {
    console.log(name, email);
    try {
        const res = await axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/v1/mail/sendEmail",
            data: {
                name,
                email
            }
        });
        if (res.data.status === "success") {
            showAlert("success", "thank you for subscribing to our newsletter");
        }
        console.log(res);
    }catch(err) {
        const {error} = err.response.data;
        if (error.code === 11000) {
            const value = err.response.data.message.match(/(["'])(\\?.)*?\1/)[0];
            const message = `duplicate field value ${value}. please provide another value`;
            showAlert("error", message);
        } else if (error.code.("EDNS")) {
            const message = `problem connecting with email service!`
            showAlert("error", message);
        } 
        showAlert("error", err.message);
    }
};