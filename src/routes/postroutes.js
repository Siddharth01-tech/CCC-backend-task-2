const express = require('express');
const postcontroller = require('../controllers/postcontroller');
const authMiddleware=require('../middlewares/auth.middleware')
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

router.post("/createpost", authMiddleware ,upload.single("image"), postcontroller.createPost);

router.get("/getposts", postcontroller.getAllPosts);

router.get("/getpost/:id", postcontroller.getPost);

router.put("/updatepost/:id", authMiddleware, upload.single("image"), postcontroller.updatePost);

router.delete("/deletepost/:id", authMiddleware, postcontroller.deletePost);


module.exports = router;
