const express = require("express");
const router = express.Router();

const {
    home,
    reportissue,
} = require("../controllers/user.controller");

const isLoggedin = require("../middleware/auth.middleware");


router.get("/home", isLoggedin, home);


module.exports = router;  