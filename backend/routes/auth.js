const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');//provide scurity to the password
var jwt = require('jsonwebtoken');//povide scurity to the client and sever token
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET='shivam is the goos boy ';

//create a User using POST "/api/auth/createuser" . no login is required
router.post('/createuser',[
    // email and password validation 
    body('name', "Invalid Name").isLength({ min: 3 }),
    body('email', "Invalid Email or Used Email").isEmail(),
    body('password', "Password lenght should be 5").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // checking validation and throwing errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check whether the email already exists
      let user = await User.findOne({ email: req.body.email })
      if (user) {
        return res.status(400).json({ error: "Email is already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secured_password = await bcrypt.hash(req.body.password, salt);
      // save the data in database
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secured_password,
      })

      // creating authontification using id
      const data = {
        user: {
          id: user.id,
        }
      }
      // generating authontification token using authtoken
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ success: "true", authToken: authToken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "server error" });
    }
  })

// login of a user '/api/auth/login'
router.post('/login',
[
  // email validation 
  body('email', "Invalid Email or Used Email").isEmail(),
  body('password', "password cannot be blanked").exists(),
],
  async (req, res) => {
    // check whether the email already exists
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(403).send({err:"Data is missing"})
    }
    try {
      let user = await User.findOne({email})
      if(!user){
        res.status(401).send({ error: "2Something went wrong try again" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) { 
        res.status(404).send({ error: "1Something went wrong try again" });
      }
      const data = {
        user: {
          id: user.id,
        }
      }
      // generating authontification token using authtoken
      const authToken = jwt.sign(data, JWT_SECRET);
      res.send({ success: "true", authToken: authToken });

    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "3server error" });
    }
  })


//get login user details using POST "/api/auth/getuser" .  login is required
router.post('/getuser', fetchuser , async (req, res) => {
try {
    userId = req.user.id;
     const user = await User.findById(userId).select("-passward");
     res.send(user);
} catch (error) {
    consloe.error(error.message);
    res.status(500).send("internal server error ");
}
})
module.exports = router;