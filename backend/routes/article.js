const express=require("express");
// nasna3 router
const router=express.Router();
//bech na3ml l'ajout supression .. lazem n'importi lmodéle mte3y
const Article=require('../models/article');
//import multer
const multer=require('multer');
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
//ysir l'upload wa9t tkhadem requete mta3ek mais 9bal matsajel fi db fama 7aja bech tekhdem
// bin l'appel mte3 requete w tasjilha fi db ta3ml upload.any() w t3adilha esm lvariable li bech t3adi fiha taswira

router.post('/ajout',upload.any('image'),(req,res)=>{
    //awel 7aja fil ajout na9raw data mte3na min lpostman wale lfrontend
    let data=req.body;
    //nasna3 instance min lmodéle li importitou w t3adilha data li khdhitha min lpostman
    let article=new Article(data);
    //fil modéle article 3andi champ esmou date lazem n3abih 9bal mansajel fil database yekhou 
    //date la7dhet tasjil l'article
    article.date=new Date();
    //lazem champ l'image yet3aba 9bal tasjil fil database 
    article.image=filename;
    //les tags ki bech yetba3thou yetba3thou sous forme string min lfront mtnjmch tab3eth array 
    //west requete array bech yji haka kelmet w binet koul wahda fihoum virgule [kohgg, trogip,..]
    //haka kifeh bech yji ki nekhouh kima houwa yji kelma wahda , data li b3aththa w tags li 
    //b3ath'tou min lfront bech tfar9ou f west artcile.tags selon lcaracére virgule 
    //yekhou koul kelma y7otha f case fi tableau
    article.tags=data.tags.split(',');
    //fonction tekhdem ba3d matsajel l'article then saved tekhou li tsajel
    //lfilename li 3abitou w 3abyt fih esm taswira nfar8ou bech may2atherch 3al ajout lmarra jeya
    article.save().then(
        (saved)=>{
            filename="";
            //ba3d tasjil tab3eth response ll front w tab3eth sayed li tsajel
            res.status(200).send(saved);
        }
    ).catch(
        //fi souret saret erreur nfi9 biha 
        err=>{
            res.status(400).send(err);
        }
    )

})
//bech yjibly les articles lkoul
router.get('/all',(req,res)=>{
    //lfind tab9a lcondition mte3ha fer8a b7okm n7ebou njibouhom lkoul
    Article.find({}).then(
        //les artciles li l9ahoum
        (articles)=>{res.status(200).send(articles)}
    ).catch(
        (err)=>{res.status(400).send(err)}
    )

})
router.get('/getbyid/:id',(req,res)=>{
    //bech ta9ra l'id min lparamétre
    let id=req.params.id;
    //findOne bech tjib wahed barka lazem condition sinon yjib lkoul l'id ykoun li 3aditou en paramétre
    Article.findOne({_id:id}).then(
        //les artciles li l9ahoum
        (articles)=>{res.status(200).send(articles)}
    ).catch(
        (err)=>{res.status(400).send(err)}
    )

})
router.get('/getbyidAuthor/:id',(req,res)=>{
    //bech ta9ra l'id min lparamétre
    let id=req.params.id;
    //ma3adech findone khtr author ynjm ykoun 3andou barcha des articles find 3adiya bil id author
    Article.find({idAuthor:id}).then(
        //les artciles li l9ahoum
        (article)=>{res.status(200).send(article)}
    ).catch(
        (err)=>{res.status(400).send(err)}
    )


})
router.delete('/supprimer/:id',(req,res)=>{
let id=req.params.id;
//bech t3adi id l3abd li t7eb tfaskhou
Article.findByIdAndDelete({_id:id}).then(
    //si tfasakh bs7i7 traja3 response 
    (article)=>{res.status(200).send(article)}
    //catch bech traja3 l'erreur
).catch(
    (err)=>{res.status(400).send(err)}
)
})
//idha ken nab3eth taswira ya3ml upload mab3ath'tech maya3mlch upload
router.put('/update/:id',upload.any('image'),(req,res)=>{
let id=req.params.id;
//bech nab3thou l'id mte3 l3abd li bech nbadlouh w nab3thou lcontenu jdid w l'update najmou 
//nbadlou biha taswira zeda
//9ryt lcontenu mte3 lbody lb3ath'tou fi request 
let data=req.body;
data.tags=data.tags.split(',');
//filename mch dima bech yekhouha ya3ni mehouch dima bech y7ot esm taswira jdid khtr sa3at ta3ml upload 
//o sa3at le tbadel ken title mte3 l'article khw wale wahda min lokhrin taswira mch dima bech tsajelha 
// 9bal mata3ml l'affectation mte3 esm taswira f west artcile.image  bech na3mlou test 
//wa9tech 3malna upload lfilename tet3aba wa9t li na3mlou upload 
//akber min 0 ya3ni fama esm mte3 taswira jdid tzed sinon nkhali esm taswira le9dim
if(filename.length>0){
    Article.image=filename;
}
//lparamétre data hiya data jdida li ene bech nbadelha
Article.findByIdAndUpdate({_id:id},data).then(
    //si tfasakh bs7i7 traja3 response 
    (article)=>{
        filename="";
        res.status(200).send(article)}
    //catch bech traja3 l'erreur
).catch(
    (err)=>{res.status(400).send(err)}
)




})







//l'export mte3 router
module.exports=router;