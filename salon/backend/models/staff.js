const mongoose = require('mongoose');
const schema = mongoose.Schema;

const staffSchema = new schema({
    EmpId : {
        type : Number,
        required : true
    },
    name : {
        type : String,
        required : true
    },

    EmpStatus : {
        type : String,
        required : true
    },

    dateOfBirth : {
        type : String,
        required : true
    },

    

    nic : {
        type : String,
        required : true
    },

    contact : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("staff",staffSchema);