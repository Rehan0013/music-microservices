import express from 'express';
import multer from 'multer';
import * as musicController from '../controllers/music.controller.js';
import { authArtistMiddleware, authMiddeware } from '../middlewares/auth.middleware.js';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/create', authArtistMiddleware,
    upload.fields([
        { name: "music", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]), musicController.createMusic);

router.get('/get', authMiddeware, musicController.getMusic);

router.get('/:id', authMiddeware, musicController.getSingleMusic);

router.delete('/:id', authArtistMiddleware, musicController.deleteMusic);

export default router;