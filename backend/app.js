
require("dotenv").config();
const jwt = require("jsonwebtoken");
const passport = require('./config/passport');
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const googleRoutes = require("./routes/google.routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://smart-civic-eight.vercel.app"
    ],
    credentials: true
}));
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(passport.initialize());

app.use("/", googleRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);



const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Work");
});