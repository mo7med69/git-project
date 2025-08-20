import { EmailsInput, getEmailsList, addEmailToList } from "../../../lib/EmailInput/emails-input.js"
var style = document.createElement("link");
style.href = "/lib/EmailInput/emails-input.css";
style.rel = "stylesheet";
document.head.appendChild(style);
class EmailInput extends HTMLElement {
    emailContainer = undefined;
    constructor() {
        super();
        var container = document.createElement("div");
        container.style.height = "10vh"
        EmailsInput(container);
        this.emailContainer = container.querySelector("span.emails-container");
        this.appendChild(container);
    }

    getMails() {
        return getEmailsList();
    }

    addMail(mail) {
        addEmailToList(this.emailContainer, mail, {});
    }
}
customElements.define("email-input", EmailInput);