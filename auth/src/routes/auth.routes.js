import express from "express";
import passport from "passport";

import {
    registerController,
    loginController,
    googleAuthCallbackController,
    logoutController,
    verifyRegistrationController,
    forgotPasswordController,
    resetPasswordController
} from "../controllers/auth.controller.js";
import { registerValidation } from "../middlewares/validation.middleware.js";

const router = express.Router();


router.post("/register", registerValidation, registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/verify-registration", verifyRegistrationController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password", resetPasswordController);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleAuthCallbackController
);

export default router;
