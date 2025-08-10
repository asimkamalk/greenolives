import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment-timezone';

const PlaceOrder = () => {
    console.log("PlaceOrder component is mounting...");
    
    const [payment, setPayment] = useState("cod")
    const [orderType, setOrderType] = useState("delivery") // Add state for order type
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        phone: ""
    })
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [hoursLoaded, setHoursLoaded] = useState(false);
    const [paymentScreenshot, setPaymentScreenshot] = useState(null);
    const [transactionId, setTransactionId] = useState("");
    const [verifying, setVerifying] = useState(false);

    const { getTotalCartAmount, token, food_list, cartItems, url, setCartItems,currency,deliveryCharge, fetchUserData, restaurantHours, fetchRestaurantHours } = useContext(StoreContext);

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let formData = new FormData();
        formData.append('address', JSON.stringify(data));
        formData.append('items', JSON.stringify(orderItems));
        formData.append('amount', getTotalCartAmount() + (orderType === "delivery" ? deliveryCharge : 0));
        formData.append('userId', userId);
        formData.append('paymentMethod', payment);
        formData.append('orderType', orderType); // Add order type to form data
        if (payment !== 'cod') {
            formData.append('transactionId', transactionId);
            if (paymentScreenshot) formData.append('paymentScreenshot', paymentScreenshot);
        }
        setVerifying(payment !== 'cod');
        let response = await axios.post(url + "/api/order/place", formData, { headers: { token },
            ...(paymentScreenshot && { 'Content-Type': 'multipart/form-data' }) });
        if (response.data.success) {
            setCartItems({});
            if (payment === 'cod') {
                navigate("/myorders");
                toast.success(response.data.message);
            } else {
                toast.info("Verifying, please wait...");
                navigate("/myorders");
            }
        } else {
            toast.error("Something Went Wrong");
        }
    }

    useEffect(() => {
        if (!token) {
            toast.error("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
        else {
            // Fetch user data and pre-fill address
            const loadUserAddress = async () => {
                console.log("Starting to load user address...");
                setLoading(true);
                const userData = await fetchUserData();
                console.log("Fetched user data:", userData);
                if (userData && userData.address) {
                    console.log("User address found:", userData.address);
                    setData(prevData => ({
                        ...prevData,
                        firstName: userData.address.firstName || "",
                        lastName: userData.address.lastName || "",
                        email: userData.email || "",
                        street: userData.address.street || "",
                        city: userData.address.city || "",
                        phone: userData.address.phone || ""
                    }));
                    setUserId(userData._id || "");
                } else {
                    console.log("No user data or address found");
                }
                setLoading(false);
            };
            loadUserAddress();
        }
    }, [token])

    useEffect(() => {
        async function checkOpenStatus() {
            let hours = restaurantHours;
            if (!hours) {
                hours = await fetchRestaurantHours();
            }
            if (hours) {
                const now = moment().tz(hours.timezone || 'Asia/Karachi');
                const opening = moment.tz(hours.openingHour, 'HH:mm', hours.timezone || 'Asia/Karachi');
                let closing = moment.tz(hours.closingHour, 'HH:mm', hours.timezone || 'Asia/Karachi');
                if (closing.isSameOrBefore(opening)) {
                    closing.add(1, 'day');
                }
                if (now.isBefore(opening) || now.isAfter(closing)) {
                    setIsOpen(false);
                } else {
                    setIsOpen(true);
                }
                setHoursLoaded(true);
            } else {
                setIsOpen(true);
                setHoursLoaded(true);
            }
        }
        checkOpenStatus();
    }, [restaurantHours]);

    if (loading || !hoursLoaded) return <div style={{textAlign:'center',marginTop:40}}><span>Loading...</span></div>;

    return (
        <>
        {!isOpen && (
            <div style={{color:'red',textAlign:'center',marginBottom:24,fontWeight:600,fontSize:18}}>
                We are currently closed. Please come back at {restaurantHours ? moment(restaurantHours.openingHour, 'HH:mm').format('h:mma') : '10:00am'}!
            </div>
        )}
        {verifying && (
            <div style={{color:'#FF4C24',textAlign:'center',marginTop:24,fontWeight:600,fontSize:18}}>
                Verifying, please wait...
            </div>
        )}
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Order Information</p>
                
                {/* Add Order Type Selection */}
                <div className="order-type" style={{marginBottom: '20px'}}>
                    <p style={{marginBottom: '10px', fontWeight: '500'}}>Order Type:</p>
                    <div style={{display: 'flex', gap: '20px'}}>
                        <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                            <input 
                                type="radio" 
                                name="orderType" 
                                value="delivery" 
                                checked={orderType === "delivery"} 
                                onChange={() => setOrderType("delivery")}
                                style={{marginRight: '8px'}}
                            />
                            Delivery
                        </label>
                        <label style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                            <input 
                                type="radio" 
                                name="orderType" 
                                value="pickup" 
                                checked={orderType === "pickup"} 
                                onChange={() => setOrderType("pickup")}
                                style={{marginRight: '8px'}}
                            />
                            Pick Up
                        </label>
                    </div>
                </div>
                
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                
                {/* Only show address fields for delivery */}
                {orderType === "delivery" && (
                    <>
                        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                        <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    </>
                )}
                
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
.                        <hr />
                        {orderType === "delivery" && (
                            <>
                                <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                                <hr />
                            </>
                        )}
                        <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + (orderType === "delivery" ? deliveryCharge : 0)}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("cod")} className="payment-option">
                        <img src={payment === "cod" ? assets.checked : assets.un_checked} alt="" />
                        <p>COD ( Cash on delivery )</p>
                    </div>
                    <div onClick={() => setPayment("easypaisa")} className="payment-option">
                        <img src={payment === "easypaisa" ? assets.checked : assets.un_checked} alt="" />
                        <p>EasyPaisa (Online Transfer)</p>
                    </div>
                    <div onClick={() => setPayment("jazzcash")} className="payment-option">
                        <img src={payment === "jazzcash" ? assets.checked : assets.un_checked} alt="" />
                        <p>JazzCash (Online Transfer)</p>
                    </div>
                    <div onClick={() => setPayment("bank")} className="payment-option">
                        <img src={payment === "bank" ? assets.checked : assets.un_checked} alt="" />
                        <p>Bank Transfer</p>
                    </div>
                    {payment !== 'cod' && (
                        <div style={{marginTop:16, background:'#181818', padding:16, borderRadius:8}}>
                            <p style={{marginBottom:8}}><b>Instructions:</b> Please transfer the total amount to the following account and upload a screenshot of your payment. Enter your transaction ID as well.</p>
                            <ul style={{marginBottom:8}}>
                                {payment === 'easypaisa' && <li>EasyPaisa Number: <b>03xx-xxxxxxx</b></li>}
                                {payment === 'jazzcash' && <li>JazzCash Number: <b>03xx-xxxxxxx</b></li>}
                                {payment === 'bank' && <li>Bank Account: <b>1234567890 (Bank Name)</b></li>}
                            </ul>
                            <input type="text" placeholder="Transaction ID" value={transactionId} onChange={e => setTransactionId(e.target.value)} style={{marginBottom:8, width:'100%', padding:8}} required />
                            <input type="file" accept="image/*" onChange={e => setPaymentScreenshot(e.target.files[0])} required />
                        </div>
                    )}
                </div>
                <button className='place-order-submit' type='submit' disabled={!isOpen || verifying}>{payment==="cod"?"Place Order":"Place Order & Upload Payment"}</button>
            </div>
        </form>
        </>
    )
}

export default PlaceOrder
