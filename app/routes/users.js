var express = require('express');
var router = express.Router();
const user = require("../models/user")

/* GET users listing. */
router.post('/register', async (req, res) =>{
  const {name, email, password} = req.body
  const user = new User({name, email, passowrd})

  try{
    await user.save()
    res.status(200).json(user)
  }catch(error){
    res.status(500).json({error: "Error registering new user !"})
  }
})

module.exports = router;
