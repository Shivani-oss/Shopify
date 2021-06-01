import express from 'express'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import { getToken } from '../utils.js'
import data from '../data.js'
import bcrypt from 'bcryptjs'


const router = express.Router()



router.post('/signin', expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: getToken(user),

      })
      return
    }
  } else {
    res.status(401).send({ message: 'Invalid Email or Password.' })
  }
}))

router.post('/register', expressAsyncHandler(async (req, res) => {
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


router.get('/create', expressAsyncHandler(async (req, res) => {
  await User.remove({})
  const createdUsers = await User.insertMany(data.users)
  res.send(createdUsers)


}))

router.get('/:id', expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    res.send(user)
  } else {
    res.status(401).send({ message: 'User Not Found' })
  }
}))

router.put('/profile', expressAsyncHandler(async (req, res) => {
    console.log(req.user._id )
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name,
        user.email = req.body.email || user.email
        if(req.body.password) {
          user.password = bcrypt.hashSync(req.body.password)
        }
        const updatedUser = await user.save()
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: getToken(updatedUser),
        })
        
    }
}))

export default router