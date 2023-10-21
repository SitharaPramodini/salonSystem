const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const salonSchema  = new Schema({
    
    Date:{
        type : String,
        required : true
    },
    CustomerName:{
        type : String,
        required : true
    },
    ContactNumber:{
        type : String,
        required : true
    },

    Email:{
        type : String,
        required : true
    },
    Address:{
        type : String,
        required : true
    },
    Status:{
        type : String,
        required : true
    }



})

const Salon = mongoose.model("Salon",salonSchema);
//export module
module.exports = Salon;   //Aniwaren mathaka thiya ganna <--  export karana vidiya

