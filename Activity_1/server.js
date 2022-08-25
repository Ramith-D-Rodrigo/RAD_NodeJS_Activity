if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const passport = require('passport');
const app = express();
const bcrpt = require('bcrypt'); //to hash the password
const flash = require('express-flash');
const session = require('express-session');

const initialize_passport = require('./user_authentication.js');
const e = require('express');
initialize_passport(passport,
    username => users.find(user => user.name === username), //find the input username from the users array (who are registered)
    userid => users.find(user => user.id === userid)    //find the id for that user
)

const users = [];   //to store user information

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

app.get("/",(req, res)=>{   //log in ui
    res.render("login");
});

app.get('/register', (req, res) =>{ //register ui
    res.render("register");
})

app.get('/welcome', (req, res) => {
    console.log(req.session.views);
    if(req.session.views){  //visiting the same page several times
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>You visited this page ' + req.session.views + ' times</p>');
        res.end();
    }
    else{      //log in for the first time
        req.session.views = 1;
        res.render("welcome");
    }

})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/',
    failureFlash: true
}))

app.post("/register", async (req, res)=>{
    try{
        const password_hash = await bcrpt.hash(req.body.password, 10);
        users.push({
            id : Date.now().toString(), //create an id
            name: req.body.username,
            password: password_hash //hashed password
        })
        res.redirect('/');
    }
    catch{
        res.redirect("/");
    }
    console.log(users);
});
app.listen(3000);