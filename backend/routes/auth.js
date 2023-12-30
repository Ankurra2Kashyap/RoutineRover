const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Harryisagoodb$oy';
//ROUTE:1 create a User using:post "/api/auth/createuser".No login Required
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('Password', 'Password must be atleast 5 Characters').isLength({ min: 5 })
], async (req, res) => {
  let success=false;
  //if there are errors ,return the bad request and the errors
  const errors = validationResult(req);  //from linen 11 to 14 we copy codewithharry website code
  if (!errors.isEmpty()) {
    return res.status(400).json({success,errors: errors.array() });
  }
  try {
    //check whether the user with this email exist already
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success,error: "Sorry a user with this email already exist" })
    }
    // below 2 line (24,25) are hashing password with salt
    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.Password, salt)
    //create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      Password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);

    // .then(user => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json({error:'please enter a unique value for email',message:err.message})})
    // res.send(req.body);


    // obj={ // this is different from above
    //     a:'thios',
    //     number:34
    // }
    // res.json(obj)
    success=true;
    res.json({success,authToken })
  }  //catch error
  catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

// ROUTE:2 Authentication a user using :POST "/api/auth/login". No login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('Password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, Password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success=false;
      return res.status(400).json({ success,error: "Please try to login with correct credentials" })
    }

    const passwordCompare = await bcrypt.compare(Password, user.Password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({ success,error: "Please try to login with correct credentials" })
    }
    const data = {
      user: {
        id: user.id
      }
    }

    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({ success,authToken })

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});

// ROUTE 3: Get logged in User Details using :POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId=req.user.id;
    const user=await User.findById(userId).select("-Password")
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})

module.exports = router;
