import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";

function startListener() {
    subscribeToQueue("user_created", async (msq) => {
        const { email, fullName: { firstName, lastName }, role } = msq;

        const template = `
            <h1>Welcome to Music Microservices</h1>
            <p>Dear <b>${firstName} ${lastName}</b>,</p>
            <p>Thanks you for registering with Music Microservices, We are excited to have you on board!</p>
            <p>Your role is: <b>${role}</b></p>
            <p>We hope you enjoy our Services</p>
            <br/>
            <p>Best regards,</p>
            <p>Music Microservices Team</p>
        `;

        await sendEmail(email, "Welcome to Music Microservices", "Thank you for registering with Music Microservices", template);
    });
}

export default startListener;