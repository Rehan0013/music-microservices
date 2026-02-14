import express from "express";
import passport from "passport";

import { registerController, loginController, googleAuthCallbackController } from "../controllers/auth.controller.js";
import { registerValidation } from "../middlewares/validation.middleware.js";

const router = express.Router();


router.post("/register", registerValidation, registerController);
router.post("/login", loginController);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route that Google will redirect to after authentication
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleAuthCallbackController
);

export default router;
