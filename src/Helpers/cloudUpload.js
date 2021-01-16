const { uploader } = require("cloudinary").v2

async function uploads(filePath) {
    try {
        let result = await uploader.upload(filePath, {
            folder: "Menu",
            use_filename: true,
        })
        return result.url
    } catch (error) {
        throw error
    }
}

module.exports = uploads
