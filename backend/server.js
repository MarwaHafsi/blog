//import express
const express=require("express");
//nestaml lfile connect bech ya3ref li hiya mawjouda
require("./config/connect");
const articleAPI=require("./routes/article");
const authorApi= require("./routes/author");
//bech nasna3 application tekhou les fonctionnalités mte3 l'express lkoul
const app=express();
//bech ywali ye9bel data type mte3houm json
app.use(express.json());
//testa3mlou wa9t yabda /article
app.use('/article',articleAPI);
app.use('/author',authorApi);
//tmakeni bech njib tsawer li msajlin fi dossier uploads m3a koul artcile ene bech n'affichig
app.use('/getimage',express.static("./uploads"));


//listen ll port mte3i bech nkhali l'application dima tekhdem matosket ela maene nsaket'ha
//arrow function tekhdem fi la7dha hedhika 
app.listen(3000,()=> {
    console.log("server work");

})