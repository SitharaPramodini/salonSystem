const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true     //backend validation 
    
}, 
    email:{
        type: String,
        required: true
    
},
    contact:{
        type: String,
        required: true
},
    date:{
        type: String,
        required: true
},
    time:{
    type: String,
    required: true
},
    stylist:{
        type: String,
        required: true
    
},
status:{
    type: String,
    default: "Pending"

}
 })

 const Appointment = mongoose.model("Appointment", appointmentSchema);  //Appointment is the name of the collection in the database         

 module.exports = Appointment;                                //Appointment is the name of the model
            