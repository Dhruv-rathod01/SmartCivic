const userModel = require("../models/user");
const postModel = require("../models/post");


const createPost = async (req, res) => {

    let user = await userModel.findOne({
        email: req.user.email
    });

    let { description,category } = req.body;

    let post = await postModel.create({
        user: user._id,
        description,
        category

    });

    user.posts.push(post._id);

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Thank you for your respose"
      });
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