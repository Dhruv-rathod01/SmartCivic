const mongoose= require('mongoose');

const postSchema=  mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date :{
        type : Date,
        default : Date.now
    },
    category : String,
    description : String,
    location : String,
    photo: {
  type: String,
  default: "",
},
status: {
  type: String,
  enum: ["Pending", "In Progress", "Resolved"],
  default: "Pending"
},
    likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user"  
        }
    ]

})

module.exports = mongoose.model('post',postSchema);