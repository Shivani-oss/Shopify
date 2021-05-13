import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { savePaymentMethod } from '../reducer/cartAction'

function PaymentMethodScreen(props) {
    const [paymentMethod, setPaymentMethod] = useState('Paypal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventdefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('./placeorder')
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-containerShipping">
                <div className="field">
                    <input type="radio" id="paypal" value="Paypal" name="paymentMethod" 
                        recquired checked onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="paypal">PayPal</label>
                </div>
                <div className="field">
                     <input type="radio" id="stripe" value="Stripe" name="paymentMethod" 
                        recquired onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="stripe">Stripe</label>
                </div>
                <div>
                    <label/>
                    <button className="button primary" style={{width:100, marginLeft:-45, marginTop:25}} type="submit">
                        Save
                    </button>
                </div>
                </div>
            </form>
             
        </div>
    )
}

export default PaymentMethodScreen
