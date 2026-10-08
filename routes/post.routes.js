const express = require("express");
const router = express.Router();

const {
    createPost,
    likePost
} = require("../controllers/post.controller");

const isLoggedin = require("../middleware/auth.middleware");

router.post("/post", isLoggedin, createPost);

router.get("/like/:id", isLoggedin, likePost);

module.exports = router;