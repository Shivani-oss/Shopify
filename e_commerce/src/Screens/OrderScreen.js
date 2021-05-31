import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsOrder, payOrder } from '../reducer/orderAction.js'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import axios from 'axios'
import { ORDER_PAY_RESET } from '../reducer/orderConstant.js'


function OrderScreen(props) {

    const orderId = props.match.params.id
    const [sdkReady, setSdkReady] = useState(false)
    const orderDetails = useSelector(state => state.orderDetails)
    const { loading, order, error } = orderDetails
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
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
        if (!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET})
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
                    <h1 className="order-Id">OrderId:  {order._id}</h1>
                    <div className="order">
                            <ul>
                                <li>
                                <div className="order-info">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name: </strong>{order.shippingAddress.fullName}<br/>
                                            <strong>Address: </strong>{order.shippingAddress.address},
                            &nbsp;{order.shippingAddress.city},&nbsp;{order.shippingAddress.postalCode},
                            &nbsp;{order.shippingAddress.country}
                                        </p>
                                        {order.isDelivered ?
                                            (<MessageBox variant="success">Delivered at {order.deliveredAt}</MessageBox>)
                                            : (<MessageBox varinat="danger">Not Delivered</MessageBox>)
                                        }
                                    </div>
                                </li>
                                <li>
                                <div className="order-info">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method: </strong>{order.paymentMethod}<br />
                                        </p>
                                        {order.isPaid ?
                                            (<MessageBox variant="success">Paid at {order.paidAt}</MessageBox>)
                                            : (<MessageBox varinat="danger">Not Paid</MessageBox>)
                                        }
                                    </div>
                                </li>
                                <li>
                                <div className="order-info">
                                        <h2>Order Items</h2>
                                        <ul className="order-list">
                                            <li>
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
                                                                <p>Qty: &nbsp; {item.qty}</p>
                                                            </div>
                                                        </div>
                                                        <div className="cart-price">
                                                            ₹{item.qty * item.price}
                                                        </div>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        <div className="order-action-payment">
                            <ul>
                                <li>
                                    <h2>Order Summary</h2>
                                </li>
                                <li>
                                    <div className="order-price">
                                        <p>Items:&nbsp;₹{order.itemsPrice} </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="order-price">
                                        <p>Shipping:   ₹{order.shippingPrice} </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="order-price">
                                        <p>TaxRs:   ₹{order.taxPrice} </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="order-price">
                                        <p><strong>OrderTotal:  ₹{order.totalPrice}</strong></p>
                                    </div>
                                </li>
                                   
                                    {
                                        !order.isPaid && (
                                            <li className="order-paypal">
                                                {
                                                    !sdkReady ? (<LoadingBox />)
                                                        : (
                                                            <>
                                                                { errorPay && (<MessageBox variant="danger">{errorPay}</MessageBox>)}
                                                                { loadingPay && (<LoadingBox />)}
                                                            <PayPalButton  onSuccess={successPaymentHandler} amount={order.totalPrice}> Complete  </PayPalButton>
                                                            </>
                                                        )
                                                }
                                            </li>

                                        )
                                    }
                                </ul>
                        </div>
                       </div>
                </>
            )
}

export default OrderScreen
