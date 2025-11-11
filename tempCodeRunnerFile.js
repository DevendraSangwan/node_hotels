const express = require('express');
const app = express();
const db = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Import models
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');

// ------------------- Default route -------------------
app.get('/', (req, res) => {
  res.send("Hello, world! Server is working ✅");
});


// ------------------- PERSON ROUTES -------------------

// ✅ POST - Add new person
app.post('/person', async (req, res) => {
  try {
    const personData = req.body;
    const newPerson = new Person(personData);

    const response = await newPerson.save();
    console.log("Person saved successfully:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json(err);
  }
});

// ✅ GET - Fetch all persons
app.get('/person', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Persons fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching persons:", err);
    res.status(500).json(err);
  }
});


// ------------------- MENUITEM ROUTES -------------------

// ✅ POST - Add new menu item
app.post('/MenuItem', async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log("Menu item saved successfully:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving menu item:", err);
    res.status(500).json(err);
  }
});

// ✅ GET - Fetch all menu items
app.get('/MenuItem', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json(err);
  }
});


// ------------------- SERVER START -------------------
app.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
