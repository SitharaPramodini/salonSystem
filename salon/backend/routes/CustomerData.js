const router = require("express").Router();
const { req, res } = require("express");
var nodemailer = require('nodemailer');
//app.use(express.json())
let CustomerData = require("../models/customerdata");

//http://localhost:8070/CustomerData/add 

router.route("/add").post((req,res) =>{ /*post,get (php,java) kiyanne http request ekak*/ 
                                        /*data insert karaddi godak welawata ganne post eka get eka neme,
                                        get eke security eka aduyi*/
                                        /*frontend eke idala backend ekata data yawaddi ee athare ee data tika access karanna puluwan get ekedi*/
    
    //Insert
    //body (meka thama execute wenne)
    //const ProductID = Number(req.body.ProductID);
    const Date = (req.body.Date);
    const CustomerName = (req.body.CustomerName);  //cast karanne mehema
    const ContactNumber = (req.body.ContactNumber);
    const Email = (req.body.Email); 
    const Address = (req.body.Address);
    const Status = (req.body.Status);
    
    
    
    const newSalon = new CustomerData({
        Date,
        CustomerName,
        ContactNumber,
        Email,
        Address,
        Status
        
    })
    newSalon.save().then(() =>{   /*then() <-- "java script promise" ekak kiyanawa mekata*/
                                    /*insert karana eka success unoth menna meka wenna one (if,else wProductName)*/ 
        res.json("Customer Added");  /*res.json --> response ekak vidiyata yawanawa jason format eken,
                                     "CustomerData Added kiyana eka frontend ekata yawanawa"*/
    }).catch((err) => {
        console.log(err);
    })
})

http://localhost:8070/CustomerData  
                                    /*route eka athulata ena eka denna one CustomerData/ <-- ekata passe,
                                    thibbama mokuth karanne na*/
//Data read
router.route("/").get((req,res) =>{
    CustomerData.find().then((CustomerData) =>{   /*find --> Salonla okkogema details gannawa*/
        res.json(CustomerData);
    }).catch((err)=>{
        console.log(err);
    })                 
})

//update
http://localhost:8070/CustomerData/update/
router.route("/update/:id").put(async(req,res)=>{      /*asyne function eken wenne , fb eka ganna udaharaneta, 
                                                        dp eka update wena gaman thawa req ekak yawanawa name eka update karanna kiyala
                                                        "oyage update eka iwarad mt denna eka ethakota user ta eka pennanna puluwan"*/
    
     let userId = req.params.id;  //params --> parameter eken ena id value eka chatch karala ganna
                                //uda thiyena id ekata dana ekama pahalatath danna one, onama variable ekak ok

    //D structure
    const {Date,CustomerName,ContactNumber,Email,Address,Status} = req.body;

    const updateSalon = {
        Date,
        CustomerName,
        ContactNumber,
        Email,
        Address,
        Status
        
    }
    const update = await CustomerData.findByIdAndUpdate(userId, updateSalon).then(()=>{   /*updateSalon <-- meka wenuwata name,age,gender --> seperate object eka hadanne nathuwa meka denna puluwan*/
        res.status(200).send({status: "User Updated", /*user: update*/}); /*(update una data tika ywanne mehema)*/ 
    }).catch(()=>{
        //console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })                                                                            
})
//Delete
http://localhost:8070/salon/delete/
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    await CustomerData.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User Delete"});
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete uder", error: err.message});
    })
})

// router.route("/get/:id").get(async(req,res)=>{
//     let userId = req.params.id;
//     await CustomerData.findById(userId).then(()=>{
//         res.status(200).send({status: "User Fetched",user: user});
//     }).catch((err)=>{
//         console.log(err.message);
//         // res.status(500).send({status: "Error with get user", error: err.message});
//     })
// })
router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    const inv = await CustomerData.findById(userId)
    .then((CustomerData) => {
        res.status(200).send({CustomerData})
    }).catch(() => {
        console.log(err.message);
        res.status(200).send({status: "error with get Products" , error: err.message});
    })
})



//Approved
router.route("/email-send").post((req,res)=>{

    //const {email,subject}=req.body

     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'isharapramodranaweera0770@gmail.com',
           pass: 'khlkpfzukjqalmzc'
         }
       });
      
       var mailOptions = {
         from: 'isharapramodranaweera0770@gmail.com',
         to: 'sitharapramodini@gmail.com',
         subject: 'MARIYA SALON',
         html :/*`<h3>${subject}</h3>*/`<p>Appoinment Approved</p>`

       };
      
       transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: success');
         }
       });
     });

//Reject
     router.route("/email-reject").post((req,res)=>{

        //const {email,subject}=req.body
    
         var transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
               user: 'isharapramodranaweera0770@gmail.com',
               pass: 'khlkpfzukjqalmzc'
             }
           });
          
           var mailOptions = {
             from: 'isharapramodranaweera0770@gmail.com',
             to: 'sitharapramodini@gmail.com',
             subject: 'MARIYA SALON',
             html :/*`<h3>${subject}</h3>*/`<p>Appoinment Rejected</p>`
    
           };
          
           transporter.sendMail(mailOptions, function(error, info){
             if (error) {
               console.log(error);
             } else {
               console.log('Email sent: success');
             }
           });
         });

module.exports = router; /*mulinma karath aulak na export karana eka*/



