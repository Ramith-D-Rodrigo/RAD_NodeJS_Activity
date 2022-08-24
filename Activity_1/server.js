const express = require('express');
const passport = require('passport');
const app = express();
const bcrpt = require('bcrypt'); //to hash the password

const users = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));

app.get("/",(req, res)=>{
    res.render("index");
});

app.post("/register", async (req, res)=>{
    try{
        const password_hash = await bcrpt.hash(req.body.password, 10);
        users.push({
            id : Date.now().toString(), //create an id
            name: req.body.username,
            password: password_hash
        })
        res.redirect('/');
    }
    catch{
        res.redirect("/");
    }
    console.log(users);
});
app.listen(3000);