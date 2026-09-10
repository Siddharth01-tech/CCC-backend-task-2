const { ImageKit } = require("@imagekit/nodejs");

const ImagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(file) {
    const fileData = Buffer.isBuffer(file) ? file.toString('base64') : file;
    const result = await ImagekitClient.files.upload({
        file: fileData,
        fileName: "post_" + Date.now(),
        folder: "backend-task-2/post"
    });

    return result;
}

module.exports = {
    uploadFile
};
