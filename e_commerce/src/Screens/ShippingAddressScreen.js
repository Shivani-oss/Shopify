import React,{useState}  from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import { saveShippingAddress } from '../reducer/cartAction'
import CheckoutSteps from './CheckoutSteps'

function ShippingAddressScreen(props) {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const [fullName, setFullName] = useState('')
    const [address, setAddress] =  useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()
    

    if (!userInfo) {
        props.history.push('/signin');
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.history.push('/payment')
        //dispatch shipping address
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))
    }
    return (
        <div>
            <CheckoutSteps step={1}/>
            <form onSubmit={submitHandler}>
                <div className="form-containerShipping">
                <div className="validation">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div className="validation">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div className="validation">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div className="validation">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div className="validation">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="button primary" style={{ width: 150, marginLeft: 150, marginTop: 25}} type="submit">
                        Continue
                    </button>
                </div>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressScreen
