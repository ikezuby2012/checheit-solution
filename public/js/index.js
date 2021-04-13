import "@babel/polyfill";

console.log("hello from index!");

import {post} from "./post";

const postBtn = document.querySelector(".form_labels");

if (postBtn) {
    postBtn.addEventListener("submit", async e => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        await post(name, email);
    })
}