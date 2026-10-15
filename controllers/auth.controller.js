const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");


const showLogin = (req, res) => {

    res.render("login", {
        message: null
    });

};
const forgot = (req,res)=>{
    res.render("forgot-password");
}

const login = async (req, res) => {

    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).render("login", {
            message: "Something went wrong"
        });
    }

    bcrypt.compare(password, user.password, function (err, result) {

        if (result) {

            const token = jwt.sign(
                {
                    email: email,
                    userid: user._id
                },
                process.env.JWT_SECRET
            );

            res.cookie("token", token);

            res.status(200).redirect("/profile");

        } else {

            res.render("login", {
                message: "Something went wrong"
            });

        }

    });

};


const register = async (req, res) => {

    let {
        username,
        name,
        age,
        email,
        password
    } = req.body;

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(409).send("User already exists");
    }

    bcrypt.genSalt(10, async (err, salt) => {

        bcrypt.hash(password, salt, async (err, hash) => {

            let user = await userModel.create({

                username,
                name,
                age,
                email,
                password: hash

            });

            const token = jwt.sign(
                {
                    email: email,
                    userid: user._id
                },
                process.env.JWT_SECRET
            );

            res.cookie("token", token);

            res.redirect("/profile");

        });

    });

};


const logout = (req, res) => {

    res.cookie("token", "");

    res.redirect("/login");

};


module.exports = {
    showLogin,
    login,
    register,
    logout,
    forgot
};