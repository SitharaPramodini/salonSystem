const router = require('express').Router();    
const {request, response}=require("express");                  //appointments is the name of the router               
let Appointment = require('../models/appointment.js');
const nodemailer = require('nodemailer');

//add appointments
router.route('/add').post((req, res) => {  
    const name = String(req.body.name);
    const email = String(req.body.email);
    const contact = String(req.body.contact);
    const date = String(req.body.date);
    const time = String(req.body.time);
    const stylist = String(req.body.stylist);
    
    const newAppointment = new Appointment({
        name,                             //name: name
        email,                            //email: email                    
        contact,                         //contact: contact
        date,                            //date: date
        time,                            //time: time   
        stylist                           //stylist: stylist  
        
    })
    
    //save to the database
    newAppointment.save().then(() => {
        res.json('Appointment added!');

        }).catch((err) => {
            console.log(err);
        })
    
        //email sending

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mariyasalon.system@gmail.com',
                pass: 'bitzvnnhfuegwfsn'   
            }
        });
        
        let details = {
            from: 'mariyasalon.system@gmail.com',
            to: email,
            subject: 'Appointment Received',
            html :`<p>Your appointment details are:<br ${name}<br>${email}<br>${contact}<br>${date}<br>${time} <br>
            we will check the availability and get back to you soon.</h3>`
  };       
        
        mailTransporter.sendMail(details, function(err, data) {
            if(err) {
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
})

//view appointments
router.route('/').get((req, res) =>{

    Appointment.find().then((appointments)=> {
    res.json(appointments)
    }).catch((err) =>{
            console.log(err);
    })

})

//update appointments
// router.route('/update/:id').put(async (req, res) => {
//     let userId = req.params.id;
//     const { name, email, contact, date, time, stylist } = req.body; //destructure

//     const updateAppointment = { 
//         name,                             //name: name
//         email,                            //email: email
//         contact,                         //contact: contact
//         date,                            //date: date
//         time,                            //time: time
//         stylist                           //stylist: stylist
//     }

//     const update = await Appointment.findByIdAndUpdate(userId, updateAppointment)   //updateAppointment is the name of the object
//     .then(()=> {
//         res.status(200).send({status: "Appointment updated"})
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send({status: "Error with updating data", error: err.message});
//     })   
// })

//delete appointments
router.route('/delete/:id').delete(async (req, res) => {
    let userId = req.params.id;
    await Appointment.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status: "Appointment deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data", error: err.message});
    })
})


//update appointments
router.route('/update/:id').put(async (req, res) => {
   
    let userId = req.params.id;
    const { name, email, contact, date, time, stylist,status } = req.body; //destructure

    const updateAppointment = { 
        name,                             //name: name
        email,                            //email: email
        contact,                         //contact: contact
        date,                            //date: date
        time,                            //time: time
        stylist,
        status                           //stylist: stylist
    }

    const update = await Appointment.findByIdAndUpdate(userId, updateAppointment)   //updateAppointment is the name of the object
    .then(()=> {
        res.status(200).send({status: "Appointment updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })   
})



 


module.exports = router;

