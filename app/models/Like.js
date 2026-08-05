const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
{
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});

likeSchema.index(
{
    blogId:1,
    userId:1
},
{
    unique:true
});

module.exports = mongoose.model("Like",likeSchema);