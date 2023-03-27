//import lmongoose pour la connexion avec le database
const mongoose=require("mongoose");
//connect avec le database mongodb w t7ot lien li tekhdem 3lih database ba3d arrow function 
//tekhdem idha connectit bs7i7

mongoose.connect("mongodb://127.0.0.1:27017/myblog").then(
    ()=>{
        console.log("conneced");
    }
//fi souret me saret erreur nekhouha fil arrow function
).catch(
    (err)=>{
        console.log(err);

    }
)
//export ll file bech ykoun accessible lfile wa7da okhra
module.exports=mongoose;