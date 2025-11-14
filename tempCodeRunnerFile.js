const passport =require('passport');
const  LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person')
passport.use(new LocalStrategy(
  usernameFeild,"username",
  passwordFeild,"password",),
  (async (USERNAME, password, done) => {
  try {
    // console.log("Received credentials:", USERNAME, password);

    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

  
    return done(null, user);

  } catch (err) {
    done(err);
  }
}));
module.exports=passport;