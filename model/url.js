//create  the model

const mongoose = require("mongoose");



const urlSchemas =new  mongoose.Schema({
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl:{
    type:String,
    required:true
  },
  visitHistory:[{ timestamp:{type:Number}}],
},{timestamps:true});

const URL=mongoose.model('urls',urlSchemas);

module.exports=URL;

