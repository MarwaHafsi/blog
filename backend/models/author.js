const mongoose=require("mongoose");
const Author=mongoose.model('Author',{
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String,
     //maynajmouch zouz author 3and'hom mm email
        unique:true,
        
    },
    password:{
        type:String
        
    },
    about:{
        type:String
    },
    image:{
        type:String
    }
    
    

}

)
module.exports=Author;