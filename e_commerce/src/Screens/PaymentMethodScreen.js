import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../reducer/cartAction'
import CheckoutSteps from './CheckoutSteps'

function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    if (!shippingAddress.address) {
        props.history.push('/shpping')
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div >
            <CheckoutSteps step={2} />
            <form onSubmit={submitHandler}>
                <div className="form-payment">
                    <div className="validation">
                        <input type="radio" id="paypal" value="Paypal" name="paymentMethod"
                            recquired checked onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                    <div className="validation">
                        <input type="radio" id="stripe" value="Stripe" name="paymentMethod"
                            recquired onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                    <div>
                        <label />
                        <button className="button primary" style={{ width: 150, marginLeft: 100, marginTop: 25 }} type="submit">
                            Continue
                    </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentMethodScreen
