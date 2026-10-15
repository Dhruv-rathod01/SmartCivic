const jwt = require("jsonwebtoken");

const { request } = require("express");

//loginprevent
function isLoggedin(req, res, next) {

    if (!req.cookies.token) {
        return res.redirect("/login");
    }

    try {

        let data = jwt.verify(
            req.cookies.token,
            process.env.JWT_SECRET
        );

        req.user = data;

        next();

    } catch (error) {

        return res.redirect("/login");

    }
}



module.exports = isLoggedin;