const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8000;

//handle middlewares
app.use(express.json()); //access the json data
app.use(express.static('public'));
//connection to database
const connectMongo = require("./connection");
const MONGODB_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/url-short";
connectMongo(MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

//use the route
const userrouter = require("./route/rt");
const  URL  = require("./model/url");
app.use("/url", userrouter);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/:shortId", async (req, res) => {
    const shortUrl = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortUrl },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    if (!entry) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server conencted to port: ${PORT}`);
});


