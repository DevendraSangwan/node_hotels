const express=require('express');
const router=express.Router();
const MenuItem = require('./../models/MenuItem');



// ✅ POST - Add new menu item
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json(err);
  }
});
router.get('/:taste',async(req,res)=>{
 try{
       const taste=req.params.taste;
    if(taste=='sweet'|| taste=='sour' || taste=='spicy'){
       const response=await MenuItem.find({taste:taste});
       console.log("data fetched successfuly");
       res.status(200).json(response); 
    }else{
        res.status(400).json(error='Invalid taste type');
    }
 }
 catch (err){
    console.error("Error fetching taste items:", err);
    res.status(500).json(err);
}
});

router.put('/:id', async (req, res) => {
  try {
    const menuItemId = req.params.id;
    const updatemenuData = req.body; // ✅ This variable stores data to update

    // ✅ Use updatemenuitemData (not updateData)
    const response = await MenuItem.findByIdAndUpdate(menuItemId,updatemenuData , {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: 'menuitem not found' });
    }

    console.log("✅ menuitem data updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("❌ Error updating person:", err);
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id',async(req,res)=>{
    try{
        const menuItemId=req.params.id;
        const response=await MenuItem.findByIdAndDelete(menuItemId);
        if(!response){
            return res.status(404).json({error:"menuitem not found"})
        }
        console.log({message:"menuitem deleted successfully"});
        res.status(200).json(response);

            }catch(err){
 console.error("❌ Error updating menuitem:", err);
    res.status(500).json({ error: err.message });
            }
        }
    
)

module.exports=router;

