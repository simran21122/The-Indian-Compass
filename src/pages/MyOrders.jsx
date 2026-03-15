import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { motion } from "framer-motion";

function MyOrders() {

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [notification, setNotification] = useState("");

  useEffect(() => {

    const storedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(storedOrders.reverse());

  }, []);

  const cancelOrder = (id) => {

    const updatedOrders =
      orders.filter((o) => o.id !== id);

    setOrders(updatedOrders);

    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getStatus = (order) => {

    const orderDate = new Date(order.date);

    const shipped = new Date(orderDate);
    shipped.setDate(orderDate.getDate() + 2);

    const out = new Date(orderDate);
    out.setDate(orderDate.getDate() + 4);

    const delivered = new Date(orderDate);
    delivered.setDate(orderDate.getDate() + 5);

    const now = new Date();

    if (now >= delivered) return 4;
    if (now >= out) return 3;
    if (now >= shipped) return 2;

    return 1;
  };

  const getStatusText = (status) => {

    if (status === 1) return "Order Placed";
    if (status === 2) return "Shipped";
    if (status === 3) return "Out for Delivery";
    return "Delivered";
  };

  const getCountdown = (deliveryDate) => {

    const diff =
      new Date(deliveryDate) - new Date();

    const days =
      Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days <= 0)
      return "Arriving Today 🚚";

    return `Arriving in ${days} day${days > 1 ? "s" : ""}`;
  };

  const downloadInvoice = (order) => {

    const text = `
Indian Compass Invoice

Order ID: ${order.id}
Product: ${order.product.name}
Quantity: ${order.qty}
Total: ₹${order.total}

Ordered on: ${formatDate(order.date)}
`;

    const blob =
      new Blob([text], { type: "text/plain" });

    const link =
      document.createElement("a");

    link.href =
      URL.createObjectURL(blob);

    link.download =
      `invoice-${order.id}.txt`;

    link.click();
  };

  const filteredOrders = orders.filter((order) => {

    const name =
      order.product.name.toLowerCase();

    const matchesSearch =
      name.includes(search.toLowerCase());

    const status =
      getStatusText(getStatus(order));

    const matchesFilter =
      filter === "all" || status === filter;

    return matchesSearch && matchesFilter;
  });

  return (

    <div className="min-h-screen bg-[#f4e1c1] text-gray-900">

      <Header />

      <div className="container mx-auto px-4 pt-24 pb-20">

        <h1 className="text-4xl font-bold text-center mb-10">
          My Orders
        </h1>

        {notification && (

          <div className="bg-green-100 text-green-800 p-3 mb-6 rounded-lg text-center">

            🔔 {notification}

          </div>

        )}

        {/* SEARCH */}

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          <input
            placeholder="Search orders..."
            className="flex-1 p-3 rounded-lg border text-black"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="p-3 rounded-lg border text-black"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >

            <option value="all">All Orders</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>

          </select>

        </div>

        {filteredOrders.length === 0 ? (

          <div className="text-center text-gray-600">
            No orders found.
          </div>

        ) : (

          <div className="space-y-8">

            {filteredOrders.map((order) => {

              const orderDate =
                new Date(order.date);

              const shipped =
                new Date(orderDate);
              shipped.setDate(
                orderDate.getDate() + 2
              );

              const out =
                new Date(orderDate);
              out.setDate(
                orderDate.getDate() + 4
              );

              const delivered =
                new Date(orderDate);
              delivered.setDate(
                orderDate.getDate() + 5
              );

              const status =
                getStatus(order);

              const truckPosition =
                (status - 1) * 33.3;

              return (

                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >

                  <div className="flex flex-col md:flex-row gap-6">

                    {/* IMAGE */}

                    <img
                      src={
                        order.product.image_url ||
                        "/placeholder.png"
                      }
                      alt={order.product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />

                    {/* DETAILS */}

                    <div className="flex-1">

                      <h2 className="text-lg font-bold">
                        {order.product.name}
                      </h2>

                      <p className="text-gray-600">
                        Quantity: {order.qty}
                      </p>

                      <p className="text-green-600 font-semibold">
                        ₹ {order.total}
                      </p>

                      <p className="text-sm text-gray-500">
                        Ordered on {formatDate(order.date)}
                      </p>

                      <p className="text-sm text-gray-500">
                        Order ID: #{order.id}
                      </p>

                      <p className="text-blue-600 font-medium mt-1">
                        Status: {getStatusText(status)}
                      </p>

                      {/* DELIVERY DATE */}

                      <p className="text-green-700 text-sm mt-1">
                        {getCountdown(delivered)}
                      </p>

                      <p className="text-gray-600 text-sm">
                        Estimated Delivery: {formatDate(delivered)}
                      </p>

                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-col gap-2">

                      <button
                        onClick={() =>
                          setNotification(
                            `Tracking order #${order.id}`
                          )
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Track Order
                      </button>

                      <button
                        onClick={() =>
                          downloadInvoice(order)
                        }
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                      >
                        Invoice
                      </button>

                      <button
                        onClick={() =>
                          cancelOrder(order.id)
                        }
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                  {/* DELIVERY BAR */}

                  <div className="mt-8 relative">

                    {/* TRUCK */}

                    <div
                      className="absolute -top-6 transition-all duration-700"
                      style={{
                        left: `${truckPosition}%`,
                      }}
                    >
                      🚚
                    </div>

                    <div className="flex justify-between text-sm">

                      <span>Order Placed</span>
                      <span>Shipped</span>
                      <span>Out for Delivery</span>
                      <span>Delivered</span>

                    </div>

                    <div className="flex items-center mt-2">

                      <div
                        title={`Order Placed: ${formatDate(orderDate)}`}
                        className={`w-4 h-4 rounded-full ${
                          status >= 1
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        className={`flex-1 h-1 ${
                          status >= 2
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        title={`Shipped: ${formatDate(shipped)}`}
                        className={`w-4 h-4 rounded-full ${
                          status >= 2
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        className={`flex-1 h-1 ${
                          status >= 3
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        title={`Out for Delivery: ${formatDate(out)}`}
                        className={`w-4 h-4 rounded-full ${
                          status >= 3
                            ? "bg-yellow-500"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        className={`flex-1 h-1 ${
                          status >= 4
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div
                        title={`Delivered: ${formatDate(delivered)}`}
                        className={`w-4 h-4 rounded-full ${
                          status >= 4
                            ? "bg-green-600"
                            : "bg-gray-300"
                        }`}
                      />

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        )}

      </div>

    </div>

  );

}

export default MyOrders;