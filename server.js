const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
require('dotenv').config();
const PORT=process.env.PORT || 4000;
// Import models

// ------------------- Default route -------------------
app.get('/', (req, res) => {
  res.send("Hello,welcome to hotel");
});


const personRoutes= require('./routes/personRoutes');
app.use('/person',personRoutes);
const menuItemRoutes= require('./routes/menuItemRoutes');
app.use('/menu',menuItemRoutes);


// ------------------- SERVER START -------------------
app.listen(PORT, () => {
  console.log("🚀 Server is running on port 4000");
});
