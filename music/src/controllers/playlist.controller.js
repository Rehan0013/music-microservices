import playlistModel from "../models/playlist.model.js";

const createPlaylistController = async (req, res) => {
    try {
        const { title, musics } = req.body;
        const playlist = await playlistModel.create({
            title,
            artist: req.user.firstName + " " + req.user.lastName,
            artistId: req.user.id,
            musics
        });
        return res.status(201).json({ message: "Playlist created successfully", playlist });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const getPlaylistController = async (req, res) => {
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

const getSinglePlaylistController = async (req, res) => {
    try {
        const { id } = req.params;
        const playlist = await playlistModel.findById(id).populate("musics");
        return res.status(200).json({ message: "Playlist fetched successfully", playlist });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { createPlaylistController, getPlaylistController, getSinglePlaylistController };