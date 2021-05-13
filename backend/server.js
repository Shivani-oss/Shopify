import express from 'express'
// import data from './data'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter  from './routes/userRouter'
import productRouter from './routes/productRouter'
import orderRouter from './routes/orderRouter'

dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/shopify' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).catch(error => console.log(error.reason))

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.get('/', (req, res) => {
    res.send('Server is ready')
})

// app.get('/api/products/:id', (req,res) => {
//     const productId = req.params.id
//     const product = data.products.find(x => x._id === productId)
//     if(product)
//         res.send(product)
//     else
//         res.status(404).send({msg: "Product Not Found"})
// })
 
// app.get('/api/products/', (req,res) => {
//     res.send(data.products)
// })

// error catcher 
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000

app.listen(5000, () => {console.log(`Server started at http://localhost:${port}`)} )

//babel - es6 - es5(node understand)
//Chrome - Inspect - XHR - know about backend process
