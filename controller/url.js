const URL=require("../model/url");
const shortid=require("shortid");

async function handlegenerateShortUrl(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({ status:"URL is mandatory"});
    }
    const shortUrl=shortid.generate();
    await URL.create({
        shortUrl:shortUrl,
        redirectUrl:body.url,
        visitHistory:[],
    });

    return res.json({id:shortUrl});
}


module.exports={
    handlegenerateShortUrl,
}
