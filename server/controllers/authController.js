const bcrypt = require('bcryptjs'); //for hashing passwords
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//SignUp endpoint
exports.signup = async (req, res) => {
    try{
      const {name, email, password} = req.body;

      const exists = await User.findOne({email});
      if(exists) return res.status(400).json({ message: "User already exists" });

      // Hash the password
      const hashed = await bcrypt.hash(password, 10);
      // Create the new user
      const user = await User.create({email, password: hashed, name});

      // Generate JWT
      const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, { expiresIn: '7d' } );
      // Return token
      res.status(201).json({ token });
    }catch(error){
        console.error("Signup error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found, Please sign up"}); 

        //See if passwords match
        const match = await bcrypt.compare(password, user.password);
        if(!match) return res.status(401).json({message: "Incorrect password"});

        // Generate JWT
        const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET, { expiresIn: '7d' } );
        // Send token
         res.status(201).json({ token });
    }catch(error){
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
};