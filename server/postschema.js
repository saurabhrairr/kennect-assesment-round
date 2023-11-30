const mongoose=require("mongoose")
const commentSchema = require("./commentSchema");
const userschema=new mongoose.Schema(
       {
              name:String,
              location:String,
              likes:Number,
              postimage:String,
              descripation:String,
              date:String,
              comments: [commentSchema],
       }
)

const postmodel=mongoose.model("user",userschema)
module.exports=postmodel