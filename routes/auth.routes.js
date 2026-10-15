const express = require("express");
const router = express.Router();

const {
    showLogin,
    login,
    register,
    logout,
    forgot
} = require("../controllers/auth.controller");

router.get("/login", showLogin);

router.post("/login", login);

router.get("/forgot-password", forgot);

router.post("/register", register);

router.get("/logout", logout);

module.exports = router;