const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app =  express();
require("dotenv").config();
// const multer = require("multer");
// let product = require("./models/product.js");

//pdf creator
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

app.use(expressLayouts);
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));
//app.listen(3000, () => console.log('app is listening on url http://localhost:3000'));


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/*
//storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename:(req,file,cb) => {
        res.send("upload file");
    },
});
const upload = multer({
    storage:Storage
}).single('testImage')

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }else{
            const newImage = new product({
                image:{
                    data:req.file.filename,
                    contentType:'image/png'
                }
            })
            newImage.save()
                .then(()=>res.send('successfully uploaded'))
                .catch((err)=> console.log(err));
            
        }
    })
})

*/


const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection established.');
})

app.listen(PORT, () => {
    console.log(`server is up and running on port number: ${PORT}`);
})

const productRouter = require("./routes/products.js");

//dyani
const appointmentRouter = require('./routes/appointments');                    
app.use('/appointments', appointmentRouter);

//isee
const salonRouter = require('./routes/CustomerData.js');
app.use("/salon", salonRouter);

//sewmini
const staffRouter = require("./routes/staffs.js");
app.use("/staff",staffRouter);

//me
app.use("/product",productRouter);

