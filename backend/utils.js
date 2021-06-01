import jwt from 'jsonwebtoken'


export const getToken = (user) => {
  return jwt.sign({ 
    _id: user._id,
    name: user.name,
    email: user.email,
  }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  })

}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  console.log(req.headers.authorization)
  if (authorization) {
    
    const token = authorization.slice(7, authorization.length)
    // starting from 7 index
    jwt.verify(token, process.env.JWT_SECRET || 'something secret', (err, decode) => {
      if (err) {
        res.status(401).send({ messages: 'Invalid Token' })
      } else {
        req.user = decode
        next()
      }
    })
  }
  else {
    res.status(401).send({ messages: 'No Token' })
  }

}

