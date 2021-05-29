import {createStore, combineReducers,  compose, applyMiddleware} from 'redux'
import {productListReducer,
        productDetailReducer} from './reducer/productReducer'
import {cartReducer} from './reducer/cartReducer'
import thunk from 'redux-thunk'

import {
    userSigninReducer,
    userRegisterReducer,
  } from './reducer/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer} from './reducer/orderReducer'
   
const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem("cartItems")) : []
const shippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethod = 'Paypal'
const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null

const intialState = {cart: {cartItems, shippingAddress, paymentMethod}, userSignin: { userInfo }}
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose
const store = createStore(reducer, intialState, composeEnhancer(applyMiddleware(thunk))) //async action - thunk

export default store