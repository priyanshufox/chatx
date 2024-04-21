const router = require('express').Router();
const User = require('../models/User');

//get all users
router.get('/',async(req,res)=>{
  try{
    const users = await User.find();
    res.json(users)
  }
    catch(err){
        res.status(500).json(err)
    }
})


//get user by email
router.get('/:email',async(req,res)=>{
    const userEmail = req.params.email;
  try{
    const users = await User.findOne({email:userEmail});
    res.json(users)
  }
    catch(err){
        res.status(500).json(err)
    }
})


//create user
router.post('/',async(req,res)=>{
  
    try{
        const data = {
            name:req.body.name,
            email:req.body.email,
            image:req.body.image
        
        }

        const userRef = await User.findOneAndUpdate(data,data,{
            new:true,
            upsert:true,
            runValidators:true
        })

        const userRes = await userRef.save();
        res.status(201).json(userRes)
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router;