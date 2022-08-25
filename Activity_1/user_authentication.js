const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserbyuserName, getUserbyID){
    const authenticateUser = async (username, password, done) => {
        const user = getUserbyuserName(username);
        console.log(user);
        if(user == null){   //user not found
            console.log("user not found");
            return done(null, false, {message: 'User was not found'});
        }

        try{
            if(await bcrypt.compare(password, user.password) == true){  //correct password
                console.log("correct password");    
                return done(null, user);
            }
            else{   //incorrect password
                console.log("incorrect password");
                return done(null, false, {message: 'Incorrect password'});
            }
        }
        catch(e){
            return done(e);
        }
    }
    passport.use(new localStrategy( { usernameField: 'username'}, authenticateUser));
    passport.serializeUser((user, done) =>{ done(null, user.id) })
    passport.deserializeUser((id, done) =>{ 
        return done(null, getUserbyID(id));
    })    
}

module.exports = initialize;