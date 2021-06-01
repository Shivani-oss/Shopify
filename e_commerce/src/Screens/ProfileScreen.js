import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailUser, updateUserProfile } from '../reducer/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../reducer/userConstant'

function ProfileScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        successs: successUpdate } = userUpdateProfile
    const dispatch = useDispatch()

    useEffect(() => {
        if (!user) {
            dispatch(detailUser(userInfo._id))
        } else {
            setName(user.name)
            setEmail(user.email)
        }

    }, [dispatch, userInfo._id, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('password and conform password not matched')
        } else {
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(updateUserProfile({ userId: user._id, name, email, password }))
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <h1>User Profile</h1>
                    {
                        loading ? (<LoadingBox />) :
                            error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                                (<>
                                    {loadingUpdate && (<LoadingBox />)}
                                    {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                                    {successUpdate && (<MessageBox variant="success">Profile Update Successfully</MessageBox>)}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}>
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="text"
                                            placeholder="Enter email"
                                            value={email}
                                            onChange={(e) => setName(e.target.value)}></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="text"
                                            placeholder="Enter password"
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Confirm Password</label>
                                        <input
                                            id="confirm-password"
                                            type="text"
                                            placeholder="Confirm password"
                                            onChange={(e) => setName(e.target.value)}
                                        >
                                        </input>
                                    </div>
                                    <button type='submit'>Update Profile</button>
                                </>
                                )
                            }
                </div>
            </form>
        </div>
    )
}

export default ProfileScreen
