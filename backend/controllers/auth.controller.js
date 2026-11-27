const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../models/user");


const login = async (req, res) => {

    let {username, email, password } = req.body;

    let user = await userModel.findOne({username, email });
    

    if (!user) {
        return res.status(404).json( {
            message: "Invalid username or email"
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

           res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

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

           res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
});

          return res.status(200).json({
        success: true,
        message: "Registration successful"
      });

        });

    });

};

const updateprofile = async (req,res)=>{
     let {
        username,
        name,
        email,
    } = req.body;
try{  
    const user = await userModel.findOneAndUpdate(
        {_id: req.user.userid},
        {username:username,
        name : name,
        email: email   
        },
        {new: true}
    )
    if(!user){
        return res.status(404).json({
            success : false,
            message : "user not found"
        })
    }
    return res.status(200).json({
        success: true,
        message : "update successfully",
        user: user
    })
} catch(error){
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}

}

const updatepassword = async(req,res)=>{
    let {
        currentpassword, 
        newpassword
    }= req.body;
    try{
         const user = await userModel.findById(req.user.userid)

         if(!user){
            return res.status(404).json({
                success : false,
                message: "user not found"
            })
         }

         const isMatch = await bcrypt.compare(currentpassword, user.password);

         if(!isMatch){
            return res.status(400).json({
                success: false,
                message : "Current password is incorrect"
            });
        }
            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hash(newpassword, salt);

            user.password = hash;

            await user.save();

            return res.status(200).json({
                success: true,
                message: "Password updated successfully"
            });
}catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        })
}

} 
const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    res.status(200).json({
        success: true,
        message: "Logout successfully"
    });
};


module.exports = {
    login,
    register,
    logout,
    updateprofile,
    updatepassword
};