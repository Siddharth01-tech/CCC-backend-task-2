const postModel = require("../models/post");
const { uploadFile } = require("../services/storage.service");

const createPost = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        let image = req.body.image;

        if (req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'));
            image = result.url;
        }

        const authorId = req.user.id || req.user.userId;

        const post = await postModel.create({
            title,
            description,
            image,
            tags,
            author: authorId
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel
            .find()
            .populate("author", "username email");

        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const getPost = async (req, res) => {
    try {
        const post = await postModel
            .findById(req.params.id)
            .populate("author", "username email");

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        res.status(200).json(post);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const updatePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user.id || req.user.userId;

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can update only your own post"
            });
        }

        const { title, description, image, tags } = req.body;

        if (title !== undefined) post.title = title;
        if (description !== undefined) post.description = description;

        if (req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'));
            post.image = result.url;
        } else if (image !== undefined) {
            post.image = image;
        }

        if (tags !== undefined) {
            post.tags = tags;
        }

        await post.save();

        res.status(200).json({
            message: "Post updated successfully",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        const userId = req.user.id || req.user.userId;

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "You can delete only your own post"
            });
        }

        await postModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};