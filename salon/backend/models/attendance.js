const mongoose = require('mongoose');
const schema = mongoose.Schema;

const AttendanceSchema = new schema({
    EmpId : {
        type : Number,
        required : true
    },

    workedHours : {
        type : String,
        required : true
    },

    month : {
        type : String,
        required : true
    },

    hourlyWage : {
        type : String,
        required : true
    },

})

module.exports = mongoose.model("attendance",AttendanceSchema);