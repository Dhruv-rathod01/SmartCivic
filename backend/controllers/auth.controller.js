const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");


const login = async (req, res) => {

    let { email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json( {
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

            res.status(200).json({
                 success: true,
                message:"Login successfully"
                
            });

        } else {

            res.status(401).json( {
                message: "Invalid email or password"
            });

        }

    });

};


const register = async (req, res) => {

    let {
        username,
        name,
        email,
        password
    } = req.body;

    let existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(409).json({message: "User already exists"});
    }

    bcrypt.genSalt(10, async (err, salt) => {

        bcrypt.hash(password, salt, async (err, hash) => {

            let user = await userModel.create({

                username,
                name,
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

          return res.status(200).json({
        success: true,
        message: "Registration successful"
      });

        });

    });

};


const logout = (req, res) => {
    res.cookie("token", "");
    res.status(200).json({
        success: true,
        message : "Logout successfully"
    })

};


module.exports = {
    login,
    register,
    logout,
};