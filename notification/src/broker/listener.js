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

    subscribeToQueue("send_otp", async (msg) => {
        const { email, otp, fullName: { firstName, lastName }, type } = msg;

        let subject, body, title;

        if (type === "registration") {
            subject = "Verify your Registration";
            title = "Verify your Registration";
            body = `<p>Please use the following OTP to complete your registration:</p><h1>${otp}</h1>`;
        } else if (type === "forgot_password") {
            subject = "Reset your Password";
            title = "Reset your Password";
            body = `<p>Please use the following OTP to reset your password:</p><h1>${otp}</h1>`;
        }

        const template = `
            <h1>${title}</h1>
            <p>Dear <b>${firstName} ${lastName}</b>,</p>
            ${body}
            <p>This OTP is valid for 10 minutes.</p>
            <br/>
            <p>Best regards,</p>
            <p>Music Microservices Team</p>
        `;

        await sendEmail(email, subject, `Your OTP is ${otp}`, template);
    });
}

export default startListener;