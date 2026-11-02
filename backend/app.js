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
    origin: "http://localhost:5173",
     credentials: true
}));


app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());

app.use(passport.initialize());

app.use("/", googleRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", postRoutes);




app.listen(3000, () => {
    console.log("Work");
});