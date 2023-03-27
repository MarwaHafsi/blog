const express=require("express");
const router=express.Router();
//import pour le modéle
const Author=require("../models/author");
const multer=require('multer');
const bcrypt=require('bcrypt');
const jwt = require("jsonwebtoken");
filename="";
//bech na3ml storage bech y7awely tsawer min requete ll dossier li bech nsajel fyh 
//tsawer w 3ana fonction west lmulter diskStorage tekhou fil paramétre un objet
//l'objet 3andou 2 attributs , destination ya3ni win t7eb tsajelha
//filename tekhou 3 paramétres awel 7aja request theni 7aja lfile w thelth 7aja paramétre ya3mely 
//redirection ll taswira mte3y 
//lfonction awel 7aja ta3melha fiha tasna3 esm lfile li ene bech nsajlou  3an tari9 date
//nasna3 variable nsamih date yekhou date mte3 tawa bech koul taswira ykoun esemha différent 3al taswira li tsajlet 9balha wale ba3dha
//puisque a7na 7ajetna besm taswira bech nsajlouh fi db lazem variable globale nsamih filename
//mloul vide wba3d matsajelha tji ll file w t7ot fih esm lfile li sna3tou bech njm nekhou 
// esm lfile adheka , ba3d matsajlet fi dossier w nsajlou m3a koul article 3andi fi database

const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
        let date=Date.now();
        //nasna3 lfile li ene bech nsajlou ,  date tawa nlas9elha point w tlasa9 l'extension mte3 taswira
        // par file li 3adit'ha en paramétre , split selon lcaractére adheka, 1 ya3ni lparamétre theni fil array
        let fl= date + '.'+file.mimetype.split('/')[1];
        // tasna3 esm file haka 5689221456.png
        //tawa redirect ll taswira tekhou min loul lparamétre mte3 l'erreur pour le moment pas d'erreur
        //wesm taswira li ene sna3tou bech nsajlou fi west dossier 
        redirect(null,fl);
        filename=fl;
    

    }

})
//tawa nasna3 lmiddleware
const upload=multer({storage:mystorage})
//nesta3ml lmiddleware bin rappel mte3 request wbin lfonction li bech tekhdem
router.post("/register",upload.any('image'),(req,res)=>{
    //na9raw lcontenu min body request 
    data=req.body;
    //tasna3 instance min lmodéle 
    author=new Author(data);
    //9bal mansajel madhebiya n7ot esm l'image li sajeltha fi attribut image mte3 l'author
    //tsajel
    author.image = filename;
    //9bal tasjil fama khedma mte3 cryptage tasna3 clé mte3 cryptage, géneration de string de 10 caractéres
    //w ba3d biha hiya ycrypti lpassword
    salt=bcrypt.genSaltSync(10);
    //bech na3ml hashage ll password ta3tiha lpassword li t7eb tcryptih li mawjoud f west data.password
    //cryptage mte3 password w t'affecih west author.password
    author.password=bcrypt.hashSync(data.password,salt);
    author.save().then(
        (savedAuthor)=>{
            //ki tsajel lfilename tfar8ou  bech fi l'ajout li ba3d may9ala9ch 
            filename="";
            res.status(200).send(savedAuthor);
        }
    ).catch(
        err=>{res.status(400).send(err)}
    )

    

})
router.post("/login",(req,res)=>{
    //na9raw data li jeya min request bech ya9ra l'email wil password
    let data=req.body;
    //bech ylawej author 3andou lmail li ene b3ath'tou find one bech ylawej 3la email yo3rdhou
    //lazem ykoun l'email li b3ath'tou nafsou fi data.email
    //fi west then une fois l9it user 3andou l'email adheka bech tlawej est ce que 3andou lpassword li ene b3ath'tou ou non
    Author.findOne({email:data.email}).then(
        //author fiha l'usser li lawejt 3lih
        (author)=>{
            //compareSync t3adilha lpassword li b3ath'tha fi request  min lfront wale postman
            //author.password password l3abd li l9itou lfonction traja3 true ou false
            let valid=bcrypt.compareSync(data.password,author.password);
            if(!valid){
                res.send("email or password invalid");
            } else {
                //si lpassword s7i7 wil mail s7i7 nasna3 token 
                //token bech n3adi fih data l'id wil email mte3 author 
                //hedha l'objet li n7ebou n7otouh west token tasn3ou w tab3thou west token
                let payload={
                    _id: author._id,
                    email: author.email,
                    fullname: author.name+" "+author.lastname

                }
                //sign fonction t3adilha l'objet t7otou west token w secret key li bech tasna3 bih token

                let token=jwt.sign(payload,'123456789');
                res.send({mytoken:token});

         

            }
        }

    ).catch(
        err=>{res.status(400).send(err)}
    )

    
})
router.get("/all",(req,res)=>{
    //lfind tab9a lcondition mte3ha fer8a b7okm n7ebou njibouhom lkoul
    Author.find({}).then(
        //les artciles li l9ahoum
        (authors)=>{res.status(200).send(authors)}
    ).catch(
        (err)=>{res.status(400).send(err)}
    )
})
router.get("/getbyid/:id",(req,res)=>{
    //bech ta9ra l'id min lparamétre
    let id=req.params.id;
    //findOne bech tjib wahed barka lazem condition sinon yjib lkoul l'id ykoun li 3aditou en paramétre
    Author.findOne({_id:id}).then(
        //les artciles li l9ahoum
        (author)=>{res.status(200).send(author)}
    ).catch(
        (err)=>{res.status(400).send(err)}
    )
    
})
router.delete("/supprimer/:id",(req,res)=>{
    let id=req.params.id;
//bech t3adi id l3abd li t7eb tfaskhou
Author.findByIdAndDelete({_id:id}).then(
    //si tfasakh bs7i7 traja3 response 
    (author)=>{res.status(200).send(author)}
    //catch bech traja3 l'erreur
).catch(
    (err)=>{res.status(400).send(err)}
)
    
})
router.put("/update/:id",(req,res)=>{

})









module.exports=router;