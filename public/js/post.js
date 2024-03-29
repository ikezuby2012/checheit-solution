import axios from "axios";

import { showAlert } from "./alerts";

export const post = async (name, email) => {
    console.log(name, email);
    try {
        const res = await axios({
            method: "POST",
            url: "/api/v1/mail/sendEmail",
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
        } 
        if (error.errno === -3008) {
            const message = `thanks for your concern!`
            showAlert("success", message);
        } 
    }
};