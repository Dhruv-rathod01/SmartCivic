const express = require("express");
const router = express.Router();

const {
    showLogin,
    login,
    register,
    logout
} = require("../controllers/auth.controller");

router.get("/login", showLogin);

router.post("/login", login);

router.post("/register", register);

router.get("/logout", logout);

module.exports = router;