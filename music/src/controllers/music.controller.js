import { uploadImage, uploadMusic } from "../services/storage.service.js";
import musicModel from "../models/music.model.js";

const createMusic = async (req, res) => {
    try {
        const musicUrl = await uploadMusic(req.files.music[0].buffer, req.files.music[0].originalname);
        const coverImageUrl = await uploadImage(req.files.coverImage[0].buffer, req.files.coverImage[0].originalname);
        const music = await musicModel.create({
            title: req.body.title,
            artist: req.user.firstName + " " + req.user.lastName,
            artistId: req.user.id,
            musicUrl: musicUrl.url,
            coverImageUrl: coverImageUrl.url
        });
        return res.status(201).json({ message: "Music created successfully", music });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { createMusic };
