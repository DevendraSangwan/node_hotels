const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hotelDB');

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
