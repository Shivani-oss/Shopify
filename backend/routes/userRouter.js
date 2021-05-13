import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import getToken  from '../utils.js'
import data from '../data.js'
import bcrypt from 'bcryptjs'


const router = express.Router()



router.post('/signin',  expressAsyncHandler (async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),

      })
      return
    }
  }else {
    res.status(401).send({ message: 'Invalid Email or Password.' })
  }
}))

router.post('/register', expressAsyncHandler (async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
  const newUser = await user.save()
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token: getToken(newUser),
    })
  } else {
    res.status(401).send({ message: 'Invalid User data' })
  }
}))


router.get('/create', expressAsyncHandler (async (req, res) => {
        await User.remove({})
        const createdUsers = await User.insertMany(data.users)
        res.send(createdUsers)
   
   
}))

export default router