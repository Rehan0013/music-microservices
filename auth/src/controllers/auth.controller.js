import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import _config from "../config/config.js";
import { publishToQueue } from "../broker/rabbit.js";

const registerController = async (req, res) => {
    const { email, password, fullName: { firstName, lastName } } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        email,
        password: hashedPassword,
        fullName: { firstName, lastName },
        role: "user",
    });

    const token = jwt.sign({ id: user._id, role: user.role }, _config.JWT_SECRET, {
        expiresIn: "2d",
    });

    await publishToQueue("user_created", {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        },
    });
};

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found. Please register" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password. Please try again" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, _config.JWT_SECRET, {
        expiresIn: "2d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            role: user.role,
        },
    });
};

const googleAuthCallbackController = async (req, res) => {
    const { user } = req;

    const isUserExist = await userModel.findOne({ $or: [{ email: user.emails[0].value }, { googleId: user.id }] });
    if (isUserExist) {
        const token = jwt.sign({ id: isUserExist._id, role: isUserExist.role }, _config.JWT_SECRET, {
            expiresIn: "2d",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 2 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: isUserExist._id,
                email: isUserExist.email,
                fullName: isUserExist.fullName,
                role: isUserExist.role,
            },
        });
    }

    const newUser = await userModel.create({
        email: user.emails[0].value,
        googleId: user.id,
        fullName: { firstName: user.name.givenName, lastName: user.name.familyName },
        role: "user",
    });

    await publishToQueue("user_created", {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
    });

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, _config.JWT_SECRET, {
        expiresIn: "2d",
    });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: newUser._id,
            email: newUser.email,
            fullName: newUser.fullName,
            role: newUser.role,
        },
    });
};


export { registerController, loginController, googleAuthCallbackController };
