const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const productScheema = new Schema({
    ref: { type:Number, required:true},
    mail: { type:String, required:true},
    name: { type:String, required:true},
    contact: { type:Number, required:true},
    pName: { type:String, required:true},
    pBrand: { type:String, required:true},
    price: { type:Number, required:true},
    quantity: { type:Number, required:true},
    total: { type:Number, required:true},
    status: { type:String, required:true},
})

module.exports = mongoose.model("product",productScheema);