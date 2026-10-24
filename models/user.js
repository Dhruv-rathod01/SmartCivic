
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    email: String,
    password: {
        type: String,
        
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]
});

module.exports = mongoose.model('user', userSchema);
