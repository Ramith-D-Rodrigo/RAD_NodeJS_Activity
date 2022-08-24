const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.render("index");
});

app.post('/profile', upload.single('pic'), function(req, res, next){
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.send("File uploaded!");
});

app.listen(5000);