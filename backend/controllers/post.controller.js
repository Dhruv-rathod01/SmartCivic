const userModel = require("../models/user");
const postModel = require("../models/post");


const createPost = async (req, res) => {

    let user = await userModel.findOne({
        email: req.user.email
    });

    let { description,category,location } = req.body;

    let post = await postModel.create({
        user: user._id,
        description,
        category,
        location,
        photo: req.file ? req.file.path : ""
    });

    user.posts.push(post._id);

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Thank you for your respose"
      });
};

const getMyReports = async(req,res)=>{
    try{
       
         let data = await postModel.find({user: req.user.userid}).sort({ date: -1 });

         return res.status(200).json({
            success: true,
            reports : data
         });
    } catch(error){
        return res.status(500).json({
      success: false,
      message: error.message
    });
    }
   
}
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
 
const home = async (req, res) => {
    
    try {

        const posts = await postModel
            .find()
            .populate("user", "name username")
            .sort({ date: -1 });


        return res.status(200).json({
            success: true,
            posts,
            currentUserId: req.user.userid
        });

    } catch (error) {
        console.log("Home error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createPost,
    likePost,
    getMyReports,
    home
};