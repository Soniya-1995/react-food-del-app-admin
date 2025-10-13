import React, { useEffect, useState } from "react";
import axios from "axios";
import "./order.css";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:3001";

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/admin/orders`);
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.post(`${url}/api/admin/updateStatus`, {
        orderId,
        status: newStatus,
      });
      if (response.data.success) {
        toast.success("Order status updated");
        fetchOrders();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="order-list add flex-col">
      <p>All User Orders</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>User</b>
          <b>Items</b>
          <b>Total</b>
          <b>Date</b>
          <b>Status</b>
        </div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="list-table-format">
              <p>{order.email}</p>
              <div>
                {order.order_data
                  ?.flat()
                  .filter((item) => !item.Order_date)
                  .map((item, i) => (
                    <p key={i}>
                      {item.name} ({item.qty}x {item.size}) - ₹{item.price}
                    </p>
                  ))}
              </div>
              <p>
                ₹
                {order.order_data
                  ?.flat()
                  .filter((item) => !item.Order_date)
                  .reduce((acc, cur) => acc + (cur.price || 0), 0)}
              </p>
              <p>
                {
                  order.order_data
                    ?.flat()
                    .find((i) => i.Order_date)?.Order_date
                }
              </p>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  )
}

export default Orders
