 //need to map the long url with the short url-->model

 const express=require('express');
 const route=express.Router();
const {handlegenerateShortUrl}=require("../controller/url") ;


route
    .post("/",handlegenerateShortUrl);



module.exports=route;
