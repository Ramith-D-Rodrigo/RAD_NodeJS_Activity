if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const passport = require('passport');
const app = express();
const bcrpt = require('bcrypt'); //to hash the password
const flash = require('express-flash');
const session = require('express-session');

const initialize_passport = require('./session.js');
initialize_passport(passport,
    username => users.find(user => user.username === username), //find the input username from the users array (who are registered)
    userid => users.find(user => user.id === userid)
)

const users = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,   //do not save when nothing is changed
    saveUninitialized: false //do not save empty values
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req, res)=>{
    res.render("index");
});

app.post("/register", async (req, res)=>{
    if(req.body.submit_btn == 'Signup'){    //user registration
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
    }
    else{   //user login
        console.log('login');
        passport.authenticate('local', {
            successRedirect: '/welcome',
            failureRedirect: '/register',
            failureFlash: true
        });
    }
});
app.listen(3000);