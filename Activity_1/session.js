const localstrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


function initialize(passport, getUserbyuserName){
    const authenticate = (username, password, done) => {
        const user = getUserbyuserName(username);
        if(user == null){
            return done(null, false, {message: 'User was not found'});
        }

        try{
            if(await bcrypt.compare(password, user.password) == true){
                return(null, user);
            }
            else{
                return done(null, false, {message: 'Incorrect password'});
            }
        }
        catch(e){
            return done(e);
        }
    }
    passport.use(new localstrategy( { username: 'username'}), authenticate);
    passport.serializeUser((user, done) =>{ })
    passport.deserializeUser((id, done) =>{ })    
}

modules.exports = initialize;