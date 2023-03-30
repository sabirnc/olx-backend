const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Product = require('../models/product')

// jwt  token 
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.secret, { expiresIn: '24h' })
}

// handling errors 
const handleErrors = (err) => {
  if(err.code == 11000){
    return {
      error:'email is already in use'
    }
  }
}


// singup 
const signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.create({ email, password })
    // create a token for an user
    const token = createToken(user._id)
    res.status(200).json({ email: user.email, token })
  }
  catch (err) {
    console.log(err.message)
    console.log(err.code)
    res.status(400).json(handleErrors(err))
  }
}



// user login 
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const emailExist = await User.findOne({ email: email })

    // check user is already signup 
    if (!emailExist) {
      res.status(400).json({ error: 'invalid email' })
    }
    
    // check user is valid 
    if (emailExist) {
      const checkPassword = await bcrypt.compare(password, emailExist.password)
      // check password 
      if (checkPassword) {
        const token = createToken(emailExist._id)
        res.status(200).json({ email: emailExist.email, token })
      }

      if (!checkPassword) {
        res.status(400).json({ error: 'incorrect password' })
      }
    }
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
}


// creating a product 
const createProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.fname,
      category: req.body.category,
      price: req.body.price,
      image: req.file.filename
    })

    res.status(200).json({ success: 'ok' })
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// fetching all products 
const product = async (req, res) => {
  try {
    const item = await Product.find({})
    res.status(200).json({ item })
  }
  catch (err) {
    res.status(400).json({ error: err.message })
  }
}




module.exports = {
  login,
  signup,
  createProduct,
  product
}