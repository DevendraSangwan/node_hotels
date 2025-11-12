const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mongoDB=process.env.MONGODB_URL;
const db = mongoose.connection;

db.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

db.on('error', (err) => {
  console.log('❌ MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

module.exports = db;
