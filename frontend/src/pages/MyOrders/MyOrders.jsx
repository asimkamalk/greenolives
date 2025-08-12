import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency, reorder } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img
                src={
                  order.items[0]?.image
                    ? order.items[0].image.startsWith("http")
                      ? order.items[0].image
                      : url + "/images/" + order.items[0].image
                    : assets.parcel_icon
                }
                alt=""
                style={{
                  width: 64,
                  height: 64,
                  objectFit: "cover",
                  borderRadius: 8,
                  margin: "0 16px 0 0",
                }}
              />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>
                {currency}
                {order.amount}.00
              </p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              {order.paymentMethod !== "cod" && (
                <div style={{ marginTop: 8 }}>
                  <b>Payment Status:</b>{" "}
                  {order.paymentStatus === "verified" ? (
                    <span style={{ color: "#4caf50" }}>Verified</span>
                  ) : order.paymentStatus === "not_verified" ? (
                    <span style={{ color: "#e53935" }}>Not Verified</span>
                  ) : (
                    <span style={{ color: "#FF4C24" }}>Verifying</span>
                  )}
                  {order.paymentScreenshot && (
                    <div style={{ marginTop: 8 }}>
                      <a
                        href={url + "/images/" + order.paymentScreenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={url + "/images/" + order.paymentScreenshot}
                          alt="Payment Screenshot"
                          style={{
                            width: 80,
                            borderRadius: 6,
                            border: "1px solid #888",
                          }}
                        />
                      </a>
                    </div>
                  )}
                </div>
              )}
              <button onClick={fetchOrders}>Track Order</button>
              <button
                onClick={() => {
                  reorder(order.items);
                  navigate("/cart");
                }}
              >
                Reorder
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
