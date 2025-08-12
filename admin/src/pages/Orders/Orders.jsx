import React, { useEffect, useState } from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import axios from "axios";
import { assets, url, currency } from "../../assets/assets";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [modalOrder, setModalOrder] = useState(null);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error("Error");
    }
  };

  const statusHandler = async (event, orderId) => {
    console.log(event, orderId);
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  const deleteOrderHandler = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const response = await axios.post(`${url}/api/order/delete`, { orderId });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    }
  };

  const paymentStatusHandler = async (orderId, status) => {
    const response = await axios.post(`${url}/api/order/payment-status`, {
      orderId,
      status,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    } else {
      toast.error("Failed to update payment status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <div className="order-item-food">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    {item.image && (
                      <img
                        src={
                          item.image.startsWith("http")
                            ? item.image
                            : `${url}/images/${item.image}`
                        }
                        alt={item.name}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          marginRight: 8,
                          borderRadius: 4,
                        }}
                      />
                    )}
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <p
                style={{ fontSize: "13px", color: "#888", margin: "4px 0 0 0" }}
              >
                {order.date
                  ? dayjs(order.date)
                      .tz("Asia/Karachi")
                      .format("DD MMM YYYY, hh:mm:ss A")
                  : ""}
              </p>
              <p className="order-item-name">
                <b>User:</b>{" "}
                {(order.address?.firstName || "") +
                  " " +
                  (order.address?.lastName || "")}
              </p>
              <p className="order-item-phone">
                <b>Phone:</b> {order.address?.phone || "-"}
              </p>
              <div className="order-item-address">
                <b>Address:</b> {order.address?.street || ""},{" "}
                {order.address?.city || ""}
              </div>
              {/* Add Order Type indicator */}
              <div style={{ marginTop: "5px" }}>
                <b>Order Type:</b>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: order.orderType === "pickup" ? "#FF4C24" : "inherit",
                  }}
                >
                  {order.orderType === "pickup" ? "Pick Up" : "Delivery"}
                </span>
              </div>
              {order.paymentMethod !== "cod" && order.paymentScreenshot && (
                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => setModalOrder(order)}
                    style={{
                      background: "#FF4C24",
                      color: "#fff",
                      padding: "8px 18px",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    View Payment
                  </button>
                </div>
              )}
            </div>
            <p>Items : {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              name=""
              id=""
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button
              className="order-delete-btn"
              onClick={() => deleteOrderHandler(order._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {modalOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setModalOrder(null)}
        >
          <div
            style={{
              background: "#181818",
              padding: 32,
              borderRadius: 12,
              minWidth: 320,
              maxWidth: 400,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginBottom: 16 }}>Payment Details</h3>
            <b>Payment Method:</b> {modalOrder.paymentMethod}
            <br />
            <b>Transaction ID:</b> {modalOrder.transactionId || "-"}
            <br />
            <b>Payment Status:</b>{" "}
            {modalOrder.paymentStatus === "verified" ? (
              <span style={{ color: "#4caf50" }}>Verified</span>
            ) : modalOrder.paymentStatus === "not_verified" ? (
              <span style={{ color: "#e53935" }}>Not Verified</span>
            ) : (
              <span style={{ color: "#FF4C24" }}>Verifying</span>
            )}
            <br />
            {modalOrder.paymentScreenshot && (
              <div style={{ margin: "16px 0" }}>
                <a
                  href={url + "/images/" + modalOrder.paymentScreenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={url + "/images/" + modalOrder.paymentScreenshot}
                    alt="Payment Screenshot"
                    style={{
                      width: 220,
                      borderRadius: 8,
                      border: "1px solid #888",
                    }}
                  />
                </a>
              </div>
            )}
            <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  paymentStatusHandler(modalOrder._id, "verified");
                  setModalOrder(null);
                }}
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Verify
              </button>
              <button
                onClick={() => {
                  paymentStatusHandler(modalOrder._id, "not_verified");
                  setModalOrder(null);
                }}
                style={{
                  background: "#e53935",
                  color: "#fff",
                  padding: "8px 18px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Reject
              </button>
              <button
                onClick={() => setModalOrder(null)}
                style={{
                  background: "#FF4C24",
                  color: "#fff",
                  padding: "12px 32px",
                  border: "none",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
