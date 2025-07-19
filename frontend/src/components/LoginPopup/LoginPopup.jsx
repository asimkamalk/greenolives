import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const LoginPopup = ({ setShowLogin }) => {

    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Login");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        address: {
            firstName: "",
            lastName: "",
            street: "",
            city: "",
            phone: ""
        }
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1]
            setData(data => ({ 
                ...data, 
                address: { 
                    ...data.address, 
                    [addressField]: value 
                } 
            }))
        } else {
            setData(data => ({ ...data, [name]: value }))
        }
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2> <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Sign Up" ? <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required /> : <></>}
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' />
                    <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                    
                    {currState === "Sign Up" && (
                        <>
                            <div className="address-fields">
                                <h4>📦 Delivery Address</h4>
                                <div className="name-fields">
                                    <input name='address.firstName' onChange={onChangeHandler} value={data.address.firstName} type="text" placeholder='First name' />
                                    <input name='address.lastName' onChange={onChangeHandler} value={data.address.lastName} type="text" placeholder='Last name' />
                                </div>
                                <div className="address-city-fields">
                                    <input name='address.street' onChange={onChangeHandler} value={data.address.street} type="text" placeholder='Address' />
                                    <input name='address.city' onChange={onChangeHandler} value={data.address.city} type="text" placeholder='City' />
                                </div>
                                <input name='address.phone' onChange={onChangeHandler} value={data.address.phone} type="text" placeholder='Phone number' />
                            </div>
                        </>
                    )}
                </div>
                <button>{currState === "Login" ? "Login" : "Create account"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" name="" id="" required/>
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
