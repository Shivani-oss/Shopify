import React, { useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {detailsOrder } from '../reducer/orderAction.js'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'


function OrderScreen(props) {

    const orderId = props.match.params.id
    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error} = orderDetails
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detailsOrder(orderId))
    }, [dispatch, orderId])

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
                                :(<MessageBox varinat="danger">Not Delivered</MessageBox>)
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
                                :(<MessageBox varinat="danger">Not Paid</MessageBox>)
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
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default OrderScreen
