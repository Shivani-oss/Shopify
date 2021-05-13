import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../reducer/userAction'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

function RegisterScreen(props) {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (userInfo) {
      alert('Register Sucessfully Completed')
      props.history.push("/")
    }
    return () => {
      //
    };
  }, [userInfo, props.history])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      alert('Password and Confirm Password are not match  ')
    }else{
      dispatch(register(name, email, password))
    }
 
  }
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Create Account</h2>
        </li>
        <li>
          {loading && <LoadingBox />}
          {error && <MessageBox variant="failed">{error}</MessageBox>}
        </li>
        <li>
          <label htmlFor="name">
            Name
          </label>
          <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" id="conformPassword" name="conformPassword" onChange={(e) => setConfirmPassword(e.target.value)}>
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Register</button>
        </li>
        <li>
          Already have an account? <Link to='/signin' style={{textDecoration: 'none', color:'darkblue'}}>Sign-in</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default RegisterScreen