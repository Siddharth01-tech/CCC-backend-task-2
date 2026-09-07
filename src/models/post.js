const mongoose = require('mongoose')

const postSchema=new mongoose.Schema({
    title:String,
    description:String,
    image:String,
    tags:[String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamps: true,
});

const postModel=mongoose.model("post",postSchema)

module.exports=postModel