const asynchandler = require('express-async-handler')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require('../Model/userModel')


const registerUser = asynchandler(async (req, res) => {

    const {name, email, password} = req.body

    if (!name || !email || !password){
        res.status(400)
        throw new Error ("Please Fill All Fields")
    }

    const userExist = await User.findOne({email})
     if (userExist){
        res.status(400)
        throw new Error ("User Already Exists")
     }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password.toString(), salt)

    //creating a new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if (newUser) {
        res.status(201).json({
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          tokken: generateToken(newUser.id)
        }
)}else{
        res.status(400)
        throw new Error ("Invalid User Data")
    }

  });
  

  const loginUser = asynchandler (async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    const Password = await (bcrypt.compare(password, user.password))
     if(user && Password){
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        tokken: generateToken(user.id)
      })
     }else{
      res.status(400)
      throw new Error ("Invalid Credentials")
     }

  });

  // generating tokken

  const generateToken = (id) => {
    return jwt.sign({ id}, process.env.JWT_SECRET,{
      expiresIn: "30d"
    })
  }  
  const getUser = asynchandler (async (req, res) => {

    const {_id, name, email } = await User.findById(req.user.id)
    res.status(201).json({
      id:_id,
      name,
      email
    })
  });


  module.exports = { registerUser, loginUser, getUser };
  