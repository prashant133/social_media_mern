const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    text: { type: String, maxlength: 100 },
    tags: { type: Array },
    img: { type: String, required: true },
    userName: { type: String },
    likes: { type: Array, default: [] },
    comments: [
        {
            text: { type: String },
            created: { type: Date, default: Date.now },
            commentedBy: { type: String }
        }
    ]
},
    {
        timestamps: true
    });

const Post = mongoose.model('posts', postSchema);
module.exports = Post;