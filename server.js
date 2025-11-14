const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport =require('passport');
const  LocalStrategy=require('passport-local').Strategy;
const Person=require('./models/Person')
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT=process.env.PORT || 4000;




const logRequest = (req, res, next) => {
  console.log(`[${new Date ().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  try {
    console.log("Received credentials:", USERNAME, password);

    const user = await Person.findOne({ username: USERNAME });
    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    const isPasswordMatch = user.password === password;
    if (!isPasswordMatch) {
      return done(null, false, { message: 'Incorrect password' });
    }

  
    return done(null, user);

  } catch (err) {
    done(err);
  }
}));


app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/', (req, res) => {
  res.send("Hello,welcome to hotel");
}); 




const personRoutes= require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menu',localAuthMiddleware,menuItemRoutes);


// ------------------- SERVER START -------------------
app.listen(PORT, () => {
  console.log("🚀 Server is running on port 4000");
});
