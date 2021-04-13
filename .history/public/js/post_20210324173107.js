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
        showAlert("error", err.response.);
    }
};