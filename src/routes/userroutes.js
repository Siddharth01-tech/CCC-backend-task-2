const express = require("express");

const usercontroller = require("../controllers/usercontroller");



const router = express.Router();


router.post("/signup", usercontroller.signup);

router.post("/login", usercontroller.login);

router.post("/logout",usercontroller.logout)

module.exports = router;