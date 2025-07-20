import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import moment from 'moment-timezone';

const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url,currency,deliveryCharge, setCartItemQuantity, restaurantHours, fetchRestaurantHours} = useContext(StoreContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);
  const [hoursLoaded, setHoursLoaded] = React.useState(false);

  React.useEffect(() => {
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

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p> <p>Title</p> <p>Price</p> <p>Quantity</p> <p>Total</p> <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id]>0) {
            return (<div key={index}>
              <div className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt="" />
                <p>{item.name}</p>
                <p>{currency}{item.price}</p>
                <input type="number" min="1" value={cartItems[item._id]} onChange={e => setCartItemQuantity(item._id, Math.max(1, Number(e.target.value)))} className="cart-qty-input" />
                <p>{currency}{item.price*cartItems[item._id]}</p>
                <p className='cart-items-remove-icon' onClick={()=>removeFromCart(item._id)}>x</p>
              </div>
              <hr />
            </div>)
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>{currency}{getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>{currency}{getTotalCartAmount()===0?0:deliveryCharge}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>{currency}{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}</b></div>
          </div>
          {!isOpen && hoursLoaded && (
            <div style={{color:'red',textAlign:'center',margin:'16px 0',fontWeight:600,fontSize:16}}>
              We are currently closed. Please come back at {restaurantHours ? moment(restaurantHours.openingHour, 'HH:mm').format('h:mma') : '10:00am'}!
            </div>
          )}
          <button onClick={()=>navigate('/order')} disabled={!isOpen}>
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
