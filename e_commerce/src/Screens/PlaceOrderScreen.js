import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {Link} from 'react-router-dom'
import { createOrder } from '../reducer/orderAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { ORDER_CREATE_RESET } from '../reducer/orderConstant.js'
import CheckoutSteps from './CheckoutSteps.js'

function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart)
  if(!cart.paymentMethod){
    props.history.push('/payment')
  }
  const orderCreate = useSelector(state => state.orderCreate)
  const { loading, success, error, order} = orderCreate
  const toPrice = (num) => Number(num.toFixed(2))  // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0))
  cart.shippingPrice = cart.itemsPrice > 500 ? toPrice(0) : toPrice(10)
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
    <div>
    <CheckoutSteps step={3}/>
    <div className="order">
            <ul>
                <li>
                    <div className="order-info">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>{cart.shippingAddress.fullName}<br/>
                            <strong>Address: </strong>{cart.shippingAddress.address}, 
                            &nbsp;{cart.shippingAddress.city}, &nbsp;{cart.shippingAddress.postalCode},
                            &nbsp;{cart.shippingAddress.country}
                        </p>
                    </div>
                </li>
                <li>
                <div className="order-info">
                        <h2>Payment</h2>
                        <p>
                            <strong>Method: </strong>{cart.paymentMethod}<br/>
                        </p>
                </div>
                </li>
                <li>
                <div className="order-info">
                        <h2>Order Items</h2>
                    <ul className="order-list">
                    <li>

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
                                    <p>Qty: &nbsp; {item.qty}</p>
                                </div>
                            </div>
                            <div>
                                {item.qty} x Rs. {item.price} = Rs. {item.qty * item.price}
                            </div>
                            </li>
                        )
                    }
                    </ul>
                    </div>
                </li>
            </ul>
        <div className="order-action">
            <ul>
                <li>
                    <h2>Order Summary</h2>
                </li>
                <li>
                    <div className="order-price">
                        <p>Items:&nbsp;₹{cart.itemsPrice} </p>
                    </div>
                </li>
                <li>
                <div className="order-price">
                    <p>Shipping:   ₹{cart.shippingPrice} </p>
                </div>
                </li>
                <li>
                <div className="order-price">
                     <p>TaxRs:   ₹{cart.taxPrice} </p>
                    </div>
                </li>
                <li>
                <div className="order-price">
                    <p><strong>OrderTotal:  ₹{cart.totalPrice}</strong></p>
                    </div>
                </li>
                  </ul>
                  <div className="order-button"> 
                      <button type="button" className="primary button" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>

                      {loading && <LoadingBox />}
                      {error && <MessageBox variant="failed">{error}</MessageBox>}
                  </div>
                   
                
                </div> 
        </div>
    </div>
)
}

export default PlaceOrderScreen
