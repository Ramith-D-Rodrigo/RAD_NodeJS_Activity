const express = require('express');
const multer  = require('multer');
const app = express();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {  //store file extension as well
    let file_name = file.originalname;  
    cb(null, file_name);
  }
});
const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.get("/",(req, res)=>{
    res.render("index");
});

app.post('/profile', upload.single('pic'), function(req, res, next){
  res.send("File uploaded!");
});

app.listen(5000);