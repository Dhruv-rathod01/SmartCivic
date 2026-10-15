require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require('./config/passport');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(passport.initialize());

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);
app.use("/", authRoutes);

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/login'
    }),
    (req, res) => {
        const user = req.user;

        const token = jwt.sign(
            { email: user.email, userid: user._id },
             process.env.JWT_SECRET
        );

        res.cookie('token', token);
        res.redirect('/profile');
    }
);

app.listen(3000, () => {
    console.log("Work");
});