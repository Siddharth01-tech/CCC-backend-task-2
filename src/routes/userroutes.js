const express = require("express");

const usercontroller = require("../controllers/usercontroller");

// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/signup", usercontroller.signup);

router.post("/login", usercontroller.login);

module.exports = router;