const express = require("express");
const multer = require('multer');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
app.use('/images', express.static('public'));
app.use(express.static('public'));
const uploadRouter = require("./routes/upload");

app.use("/api", uploadRouter);






app.listen(3001, () => {
    console.log('Server started on port 3001');
  });