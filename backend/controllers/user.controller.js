const userModel = require("../models/user");
const home = (req, res) => {
    res.json({ success: true });
};

const profile = async (req,res)=>{
    const data = await userModel.findOne({
            email: req.user.email
        });
         return res.status(200).json({
        success: true,
        user: data
    });
}
module.exports = {
    home,
    profile
   
};