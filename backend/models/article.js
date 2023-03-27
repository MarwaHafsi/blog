//import mongoose khtr biha hiya na3ml lcréation mte3 lmodéle mte3y
const mongoose=require("mongoose");
//nasna3 lmodéle mte3y
const Article=mongoose.model("Article",{
    title:{
        type:String
    },
    idAuthor:{
        type:String
    },
    description:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
    tags:{
        type:Array
    },


})
module.exports=Article;
