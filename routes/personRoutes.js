const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// ------------------- POST - Add new person -------------------
router.post('/', async (req, res) => {
  try {
    const personData = req.body;
    const newPerson = new Person(personData);

    const response = await newPerson.save();
    console.log("✅ Person saved successfully:", response);
    res.status(200).json(response);
  } catch (err) {
    console.error("❌ Error saving person:", err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- GET - Fetch all persons -------------------
router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("✅ All persons fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching persons:", err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- GET - Fetch by work type -------------------
router.get('/:workType', async (req, res) => {
  try {
    const workType = req.params.workType.toLowerCase();
    const validTypes = ['chef', 'waiter', 'manager', 'cleaner'];

    if (validTypes.includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log(`✅ Data fetched successfully for work: ${workType}`);
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: 'Invalid work type' });
    }
  } catch (err) {
    console.error("❌ Error fetching by work type:", err);
    res.status(500).json({ error: err.message });
  }
});


// ------------------- PUT - Update a person by ID -------------------
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    const updatePersonData = req.body; // ✅ This variable stores data to update

    // ✅ Use updatePersonData (not updateData)
    const response = await Person.findByIdAndUpdate(personId, updatePersonData, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log("✅ Person data updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("❌ Error updating person:", err);
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:"person not found"})
        }
        console.log({message:"Person deleted successfully"});
        res.status(200).json(response);

            }catch(err){
 console.error("❌ Error updating person:", err);
    res.status(500).json({ error: err.message });
            }
        }
    
)


// ------------------- EXPORT ROUTER -------------------
module.exports = router;
