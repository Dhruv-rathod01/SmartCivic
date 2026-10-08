const userModel = require("../models/user");

const home = (req, res) => {
    res.render("index");
};

const profile = async (req, res) => {

    let user = await userModel
        .findOne({ email: req.user.email })
        .populate("posts");

    res.render("profile", { user });
};

module.exports = {
    home,
    profile
};