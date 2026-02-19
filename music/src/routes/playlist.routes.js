import express from 'express';
import { createPlaylistController, getPlaylistController, getSinglePlaylistController } from '../controllers/playlist.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/create", authMiddleware, createPlaylistController);
router.get("/get", getPlaylistController);
router.get("/get/:id", getSinglePlaylistController);

export default router;