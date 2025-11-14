const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next();
};

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', (req, res) => {
  res.send("Hello, welcome to hotel");
});

// Import routes
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',localAuthMiddleware, personRoutes);

// Menu route open
app.use('/menu', menuItemRoutes);

// Login route
app.post('/login', localAuthMiddleware, (req, res) => {
  res.send("🎉 Login Success");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
