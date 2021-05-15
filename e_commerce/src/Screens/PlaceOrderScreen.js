import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {Link} from 'react-router-dom'
import { createOrder } from '../reducer/orderAction.js'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_CREATE_RESET } from '../reducer/orderConstant.js'

function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart)
  if(!cart.paymentMethod){
    //   props.history.push('./payment')
  }
  const orderCreate = useSelector(state => state.orderCreate)
    const { loading, success, error, order} = orderCreate
  const toPrice = (num) => Number(num.toFixed(2))  // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  const dispatch = useDispatch()

  useEffect(() => {
      if(success){
          props.history.push(`/order/${order._id}`)
          dispatch({ type: ORDER_CREATE_RESET})
      }
  }, [dispatch, order, props.history, success])
  
  const placeOrderHandler = () => {
        dispatch(createOrder({...cart, orderItems: cart.cartItems}))
  }
  return (
    <div classname="row top">
      <div classname="col-2">
            <ul>
                <li>
                    <div classname="card card-body">
                        <h2>Shipping</h2>
                        <p>
                            {/* <strong>Name: </strong>{cart.shippingAddress.fullName}<br/>
                            <strong>Address: </strong>{cart.shippingAddress.address},
                            {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                            {cart.shippingAddress.country} */}
                        </p>
                    </div>
                </li>
                <li>
                 <div classname="card card-body">
                        <h2>Payment</h2>
                        <p>
                            <strong>Method: </strong>{cart.paymentMethod}<br/>
                        </p>
                </div>
                </li>
                 <li>
                    <div classname="card card-body">
                        <h2>Order Items</h2>
                        <ul className="cart-list-container">
                    <li>
                        <h1>
                        Shopping Cart
                        </h1>
                        <div>
                        Price
                        </div>
                    </li>
                    {
                        cart.cartItems.map(item =>
                            <li key={item.id}>
                            <div className="cart-image">
                                <img src={item.image} alt="product" />
                            </div>
                            <div className="cart-name">
                                <div>
                                    <Link to={"/product/" + item.product}>
                                        {item.name}
                                    </Link>
                                </div>
                            </div>
                            <div className="cart-price">
                                {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                            </div>
                            </li>
                        )
                    }
                    </ul>
                    </div>
                </li>
            </ul>
      </div>
      <div classname="col-1">
        <div className="card card-body">
            <ul>
                <li>
                    <h2>Order SUmmary</h2>
                </li>
                <li>
                    <div className="row">
                        <div>Items</div>
                        <div>Rs.{cart.itemPrice} </div>
                    </div>
                </li>
                 <li>
                    <div className="row">
                        <div>Shippinjg</div>
                        <div>Rs.{cart.shippingPrice} </div>
                    </div>
                </li>
                 <li>
                    <div className="row">
                        <div>Tax</div> 
                        <div>Rs.{cart.taxPrice} </div>
                    </div>
                </li>
                 <li>
                    <div className="row">
                        <div><strong>Order Total</strong></div>
                        <div><strong>Rs.{cart.totalPrice}</strong></div>
                    </div>
                </li>
                <li>
                    <button type="button" className="primary button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                </li>
                    {loading && <LoadingBox />}
                    {error && <MessageBox variant="failed">{error}</MessageBox>}
            </ul>
        </div> 
      </div>
    </div>
  )
}

export default PlaceOrderScreen
