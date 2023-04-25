const express = require("express");
const multer = require('multer');
const path = require('path');
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });


router.post('/upload',upload.single('image'),(req,res)=>{
try {
    res.status(200).json({ imageUrl: `http://localhost:3001/public/images/${req.file.filename}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get("/getImages", (req, res) => {
    const images = fs.readdirSync("./public/images");
    const urls = images.map((image) => "http://localhost:3001/images/" + image);
    res.json({ urls });
    });
    
module.exports = router;
