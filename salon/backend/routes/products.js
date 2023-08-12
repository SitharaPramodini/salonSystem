const router = require("express").Router();
let Products = require("../models/product");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//<<<<<<< Updated upstream
//const multer = require("multer");
//=======
// const multer = require("multer");
//>>>>>>> Stashed changes
const upload = require("../middleware/upload");
var nodemailer = require('nodemailer');
let Payments = require("../models/Payment");

//new
// const Storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null,)
//   },
//   filename: (req,file,callback) => {
//     callback(null, file.originalname);
//   }
// })
// const uploadd = multer({storage:Storage});
//out

//add new one
router.route("/add").post((req,res)=>{
    
    const ref = Number(req.body.ref);
    const mail = req.body.mail;
    const name = req.body.name;
    const contact = Number(req.body.contact);
    const pName = req.body.pName;
    const pBrand = req.body.pBrand;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);
    const total = Number(req.body.total);
    const status = req.body.status;
    

    const newProducts = new Products({
    ref,
    mail,
    name,
    contact,
    pName,
    pBrand,
    price,
    quantity,
    total,
    status

    })


    newProducts.save().then(()=>{
        res.json("Products added")
    }).catch((err)=>{
        console.log(err);
    })



    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mariyasalon.system@gmail.com',
        pass: 'bitzvnnhfuegwfsn'
      }
    });
    
    var mailOptions = {
      from: 'mariyasalon.system@gmail.com',
      to: mail,
      subject: 'your reservation is successfull',
      html :`<p>hello ${name}, we are successfully receive your reservation. your reservation amount is LKR. ${total}.00. pay and buy your reserved products at our salon by verifying your reservation code </p>
              <br><br><h3>this is your reservation code : ${ref}</h3>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: success');
      }
    });
})


//view all
router.route("/").get((req,res)=>{
    Products.find().then((products)=>{
        res.json(products)
    }).catch((err)=>{
        console.log(err);
    })
})


router.route("/update/:id").put(async (req,res) => {
    let invID = req.params.id;
    const {ref,mail,name,contact,pName,pBrand,price,quantity,total,status} = req.body;

    const updateProducts = {
    ref,
    mail,
    name,
    contact,
    pName,
    pBrand,
    price,
    quantity,
    total,
    status
    }

    const update = await Products.findByIdAndUpdate(invID,updateProducts)
    .then(() => {
        res.status(200).send({status: "Products updated"})
    }).catch((err) => {
        res.status(200).send({status: "Error with updating data"});
    })
})

// router.route("/get/:id").get(async (req, res) => {
//   let invID = req.params.id;
//   console.log("product", invID);
//   const userRes = await Products.findById(invID)
//     .then((product) => {
//       res.status(200).send({ status: "User fetched", product });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       res
//         .status(200)
//         .send({ status: "Error with get user", error: err.message });
//     });
// });



router.route("/delete/:id").delete(async (req,res) => {
    let invID = req.params.id;

    await Products.findByIdAndDelete(invID)
    .then(() => {
        res.status(200).send({status: "Products deleted"});
    }).catch((err) => {
        res.status(200).send({status: "Error with delete Products" , error: err.message});
    })
})


router.route("/get/:id").get(async (req, res) => {
    let InvID = req.params.id;
    const inv = await Products.findById(InvID)
    .then((Products) => {
        res.status(200).send({status: "Products fetched" , Products})
    }).catch(() => {
        console.log(err.message);
        res.status(200).send({status: "error with get Products" , error: err.message});
    })
})


// POST: Create a new post
/*router.post("/createpost", async (req, res) => {
    try {
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
      });
      await post.save();
      res.send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // GET: Retrieve all posts
  router.get("/viewpost", async (req, res) => {
    try {
      const posts = await Post.find();
      res.send(posts);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // GET: Retrieve a specific post by ID
  router.get("/view/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).send("Post not found.");
      res.send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // PATCH: Update a specific post by ID
  router.patch("/updatepost/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      if (!post) return res.status(404).send("Post not found.");
      res.send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // DELETE: Delete a specific post by ID
  router.delete("/deletepost/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (!post) return res.status(404).send("Post not found.");
      res.send(post);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  */
  
// const upload = require('../middleware/upload')



//send mail
router.route('/email-send').post(async(req, res)=>{
  const mail = req.body.mail;

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mariyasalon.system@gmail.com',
        pass: 'yquctaejyjvdcunt'
      }
    });
    
    var mailOptions = {
      from: 'isharapramodranaweera0770@gmail.com',
      to: 'isharapramodranaweera@gmail.com',
      subject: 'your reservation is successfull',
      html :`<h3>awa awa</h3>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: success');
      }
    });

})

// router.route("/envAdd").post((req,res)=>{
    
//     const name= req.body.ref;
//     const price= Number(req.body.ref);
//     const description=req.body.ref;
//     const category=req.body.ref;
//     const status= req.body.ref;

//     const newenvProduct = new envProduct({
//        name,
//        price,
//        description,
//        category,
//        status

//     })


//     newenvProduct.save().then(()=>{
//         res.json("envProduct added")
//     }).catch((err)=>{
//         console.log(err);
//     })


// })


//send payment
router.route("/addPay").post((req,res)=>{
    
  const ref = Number(req.body.ref);
  const pName = req.body.pName;
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);
  const total = Number(req.body.total);

  const newPayment = new Payments({
  ref,
  pName,
  price,
  quantity,
  total
  })

  newPayment.save().then(()=>{
      res.json("payment collected")
  }).catch((err)=>{
      console.log(err);
  })
})




module.exports = router;



// router.route("/email-send").post((req,res)=>{
// // router.route('/email-send', (req, res)=>{
//   //const {email,subject}=req.body

//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'isharapramodranaweera0770@gmail.com',
//         pass: 'khlkpfzukjqalmzc'
//       }
//     });
  
//     var mailOptions = {
//       from: 'isharapramodranaweera0770@gmail.com',
//       to: 'sitharapramodini@gmail.com',
//       subject: 'Sakabun Salon',
//       // html :`<h3>${subject}</h3>`<p>my name is sakabun</p>`

//     };
    
//     transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: success');
//       }
//     });

// });
