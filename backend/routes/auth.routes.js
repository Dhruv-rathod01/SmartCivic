const express = require("express");
const router = express.Router();

const {
    login,
    register,
    logout,
    forgot,
    updateprofile,
    updatepassword
} = require("../controllers/auth.controller");
const rateLimit = require("../middleware/rateLimit.middleware");
const isLoggedin = require("../middleware/auth.middleware");



router.post("/login",rateLimit,  login);
router.post("/register",rateLimit, register);
router.get("/logout", logout);
router.post("/update-profile" , isLoggedin ,updateprofile);
router.post("/update-password" , isLoggedin ,updatepassword)


module.exports = router;