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

const getMusic = async (req, res) => {
    try {
        const { title, artist, artistId, page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = req.query;

        // Build dynamic filter object
        const filter = {};

        if (title) {
            filter.title = { $regex: title, $options: "i" }; // case-insensitive partial match
        }

        if (artist) {
            filter.artist = { $regex: artist, $options: "i" };
        }

        if (artistId) {
            filter.artistId = artistId;
        }

        // Pagination calculations
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Fetch music with pagination & sorting
        const music = await musicModel
            .find(filter)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Total count for frontend pagination
        const total = await musicModel.countDocuments(filter);

        return res.status(200).json({
            message: "Music fetched successfully",
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            music
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

const getSingleMusic = async (req, res) => {
    try {
        const { id } = req.params;
        const music = await musicModel.findById(id);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }
        return res.status(200).json({ message: "Music fetched successfully", music });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const deleteMusic = async (req, res) => {
    try {
        const { id } = req.params;
        const music = await musicModel.findById(id);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }
        if (music.artistId !== req.user.id) {
            return res.status(403).json({ message: "Forbidden" });
        }
        await musicModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Music deleted successfully", music });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { createMusic, getMusic, getSingleMusic, deleteMusic };
