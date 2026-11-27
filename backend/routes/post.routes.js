const express = require("express");
const router = express.Router();

const {
    createPost,
    likePost,
    getMyReports,
    home
} = require("../controllers/post.controller");

const isLoggedin = require("../middleware/auth.middleware");
const upload = require("../middleware/upload");



router.post( "/post", isLoggedin, upload.single("photo"), createPost);
router.get('/my-reports',isLoggedin, getMyReports);
router.get('/home', isLoggedin, home)
router.get("/like/:id", isLoggedin, likePost);

module.exports = router;