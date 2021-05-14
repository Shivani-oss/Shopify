import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../reducer/orderAction.js'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import axios from 'axios'


function OrderScreen(props) {

    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails
    const dispatch = useDispatch()

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order._id) {
            dispatch(detailsOrder(orderId))
        } else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPaypalScript()
                } else {
                    setSdkReady(true)
                }
            }
        }


    }, [dispatch, order, orderId, sdkReady])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult))
    }

    return loading ? (<LoadingBox />)
        : error ? (<MessageBox varinat='danger'>{error}</MessageBox>)
            : (
                <>
                    <h1>Order {order._id}</h1>
                    <div classname="row top">
                        <div classname="col-2">
                            <ul>
                                <li>
                                    <div classname="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong>{order.shippingAddress.fullName}<br />
                                            <strong>Address: </strong>{order.shippingAddress.address},
                            {order.shippingAddress.city},{order.shippingAddress.postalCode},
                            {order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ?
                                            (<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>)
                                            : (<MessageBox varinat="danger">Not Delivered</MessageBox>)
                                        }
                                    </div>
                                </li>
                                <li>
                                    <div classname="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong>{order.paymentMethod}<br />
                                        </p>
                                        {order.isPaid ?
                                            (<MessageBox variant="success">Paid at {order.isPaid}</MessageBox>)
                                            : (<MessageBox varinat="danger">Not Paid</MessageBox>)
                                        }
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
                                                order.orderItems.map(item =>
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
                                            <div>Rs.{order.itemPrice} </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shippinjg</div>
                                            <div>Rs.{order.shippingPrice} </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>Rs.{order.taxPrice} </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong></div>
                                            <div><strong>Rs.{order.totalPrice}</strong></div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>{!sdkReady ? (<LoadingBox />)
                                                : <PayPalButton onClick={this.handlePaypal.bind(this)} onSuccess={successPaymentHandler}> Complete Amount={order.totalPrice} </PayPalButton>}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )
}

export default OrderScreen
