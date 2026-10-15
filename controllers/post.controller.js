const userModel = require("../models/user");
const postModel = require("../models/post");


const createPost = async (req, res) => {

    let user = await userModel.findOne({
        email: req.user.email
    });

    let { content } = req.body;

    let post = await postModel.create({
        user: user._id,
        content

    });

    user.posts.push(post._id);

    await user.save();

    res.redirect("/profile");
};


const likePost = async (req, res) => {

    let post = await postModel
        .findOne({ _id: req.params.id })
        .populate("user");

    if (post.likes.indexOf(req.user.userid) === -1) {

        post.likes.push(req.user.userid);

    } else {

        post.likes.splice(
            post.likes.indexOf(req.user.userid),
            1
        );

    }

    await post.save();

    res.redirect("/profile");
};


module.exports = {
    createPost,
    likePost
};