import React, { useEffect, useState } from 'react'
import './Orders.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const Order = () => {

  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`)
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    }
    else {
      toast.error("Error")
    }
  }

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
  }

  const deleteOrderHandler = async (orderId) => {
    if(window.confirm('Are you sure you want to delete this order?')) {
      const response = await axios.post(`${url}/api/order/delete`, { orderId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <div className='order-item-food'>
                {order.items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                    {item.image && (
                      <img src={`${url}/images/${item.image}`} alt={item.name} style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 8, borderRadius: 4 }} />
                    )}
                    <span>{item.name} x {item.quantity}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '13px', color: '#888', margin: '4px 0 0 0' }}>
                {order.date ? dayjs(order.date).tz('Asia/Karachi').format('DD MMM YYYY, hh:mm:ss A') : ''}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street}</p>
                <p>{[
                  order.address.city,
                  order.address.state,
                  order.address.country,
                  order.address.zipcode
                ].filter(Boolean).join(', ')}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>{currency}{order.amount}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.status} name="" id="">
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="order-delete-btn" onClick={() => deleteOrderHandler(order._id)} style={{marginLeft: '10px', color: 'red'}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
