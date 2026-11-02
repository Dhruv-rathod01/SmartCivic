const express = require("express");
const router = express.Router();

const {
    showLogin,
    login,
    register,
    logout,
    forgot
} = require("../controllers/auth.controller");
const rateLimit = require("../middleware/rateLimit.middleware");



router.post("/login",rateLimit,  login);
router.post("/register",rateLimit, register);
router.get("/logout", logout);


module.exports = router;