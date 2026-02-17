import { v4 as uuidv4 } from 'uuid';
import ImageKit from "imagekit";
import _config from "../config/config.js";

const imagekit = new ImageKit({
    publicKey: _config.IMAGEKIT_PUBLIC_KEY,
    privateKey: _config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: _config.IMAGEKIT_URL_ENDPOINT,
});

const uploadImage = async (fileBuffer, filename) => {
    try {
        const uniqueFilename = `${uuidv4()}-${filename}`;
        const result = await imagekit.upload({
            file: fileBuffer.toString("base64"),
            fileName: uniqueFilename,
            folder: "microservice-music/images",
        });
        return result;
    } catch (error) {
        console.error("ImageKit Upload Failed with Error:", error);

        const errorMessage = error.message
            ? error.message
            : typeof error === "object" && error !== null
                ? JSON.stringify(error)
                : "Unknown ImageKit API Error";

        throw new Error(`Failed to upload image to ImageKit: ${errorMessage}`);
    }
};

const uploadMusic = async (fileBuffer, filename) => {
    try {
        const uniqueFilename = `${uuidv4()}-${filename}`;
        const result = await imagekit.upload({
            file: fileBuffer.toString("base64"),
            fileName: uniqueFilename,
            folder: "microservice-music/musics",
        });
        return result;
    } catch (error) {
        console.error("ImageKit Upload Failed with Error:", error);

        const errorMessage = error.message
            ? error.message
            : typeof error === "object" && error !== null
                ? JSON.stringify(error)
                : "Unknown ImageKit API Error";

        throw new Error(`Failed to upload music to ImageKit: ${errorMessage}`);
    }
};

export { uploadImage, uploadMusic };