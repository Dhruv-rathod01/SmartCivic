const express = require("express");
const router = express.Router();

const {
    home,
    profile
} = require("../controllers/user.controller");

const isLoggedin = require("../middleware/auth.middleware");

router.get("/", home);

router.get("/profile", isLoggedin, profile);

module.exports = router;