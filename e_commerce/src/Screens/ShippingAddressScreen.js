import React,{useState}  from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import { saveShippingAddress } from '../reducer/cartAction'

function ShippingAddressScreen() {
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const [fullName, setFullName] = useState('')
    const [address, setAddress] =  useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const dispatch = useDispatch()


    const submitHandler = (e) => {
        e.preventDefault()
        //dispatch shipping address
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-containerShipping">
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required></input>
                </div>
                <div> 
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
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

export default ShippingAddressScreen
