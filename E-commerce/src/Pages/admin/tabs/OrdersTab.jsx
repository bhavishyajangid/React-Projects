import React, { useState } from "react";
import { FiPackage } from "react-icons/fi";
import { toast } from "react-toastify";

const INITIAL_ORDERS = [
  {
    id: "o1",
    date: "14/06/2026",
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1 234-567-8901",
      address: "123 Main St, Apt 4B, New York, NY 10001, USA",
    },
    items: [
      { name: "Men's Round Neck Cotton T-Shirt", quantity: 2, size: "L", price: 28 },
      { name: "Women High Rise Skinny Jeans", quantity: 1, size: "M", price: 45 },
    ],
    paymentMethod: "COD",
    totalAmount: 101,
    status: "Order Placed",
  },
  {
    id: "o2",
    date: "15/06/2026",
    customer: {
      name: "Sarah Jenkins",
      email: "sarah.j@example.com",
      phone: "+1 312-889-4455",
      address: "742 Evergreen Terrace, Chicago, IL 60601, USA",
    },
    items: [
      { name: "Women Ribbed Knit Sweater", quantity: 1, size: "S", price: 55 },
    ],
    paymentMethod: "Stripe",
    totalAmount: 55,
    status: "Packing",
  },
  {
    id: "o3",
    date: "16/06/2026",
    customer: {
      name: "Michael Smith",
      email: "m.smith@example.com",
      phone: "+44 7911 123456",
      address: "221B Baker St, London, NW1 6XE, UK",
    },
    items: [
      { name: "Men's Relaxed Fit Cargo Pants", quantity: 1, size: "XL", price: 38 },
      { name: "Kids Hooded Winter Fleece", quantity: 2, size: "M", price: 35 },
    ],
    paymentMethod: "Razorpay",
    totalAmount: 108,
    status: "Delivered",
  },
  {
    id: "o4",
    date: "17/06/2026",
    customer: {
      name: "Emma Watson",
      email: "emma.w@example.com",
      phone: "+1 415-998-0012",
      address: "555 California St, Suite 200, San Francisco, CA 94104, USA",
    },
    items: [
      { name: "Women High Rise Skinny Jeans", quantity: 2, size: "S", price: 45 },
    ],
    paymentMethod: "Stripe",
    totalAmount: 90,
    status: "Dispatched",
  },
];

const ORDER_STATUS_OPTIONS = [
  "Order Placed",
  "Packing",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const getStatusBadgeStyles = (status) => {
  switch (status) {
    case "Order Placed":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Packing":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "Dispatched":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "Out for Delivery":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Delivered":
      return "bg-green-50 text-green-700 border-green-200";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const OrdersTab = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order status updated to "${newStatus}"`);
  };

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-medium text-[#414753] prata-regular">
            Orders Management
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Track user orders, check shipping details, payment modes, and update order fulfillment status.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 border border-gray-300 rounded outline-none px-2 text-xs bg-white text-gray-700 cursor-pointer focus:border-black focus:ring-1 focus:ring-black"
          >
            <option value="All">All Statuses</option>
            {ORDER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8">
          <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const totalItemsCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

            return (
              <div
                key={order.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-5 transition-all shadow-sm items-start"
              >
                {/* Left side: Package Icon */}
                <div className="col-span-1 lg:col-span-1 flex items-center justify-center py-2 shrink-0">
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-400">
                    <FiPackage className="text-3xl" />
                  </div>
                </div>

                {/* Middle side: Ordered Items & Shipping Details */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-3">
                  <div>
                    {/* Items formatted text */}
                    <div className="text-sm font-semibold text-gray-900 leading-relaxed">
                      {order.items.map((item, index) => (
                        <span key={index}>
                          {item.name} x {item.quantity}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            ({item.size})
                          </span>
                          {index < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="border-t border-gray-100 pt-2 flex flex-col gap-1 text-xs text-gray-600">
                    <p className="font-semibold text-gray-900">{order.customer.name}</p>
                    <p className="leading-relaxed text-gray-500">{order.customer.address}</p>
                    <p className="mt-1">
                      <span className="font-medium text-gray-800">Phone:</span> {order.customer.phone}
                    </p>
                  </div>
                </div>

                {/* Right side: Payment, Date, total, status selector */}
                <div className="col-span-1 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-3 lg:text-right w-full text-xs text-gray-700">
                  <div className="flex flex-col gap-1 text-left lg:text-right">
                    <p>
                      <span className="font-medium text-gray-500">Items:</span>{" "}
                      <span className="font-semibold text-gray-800">{totalItemsCount}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Method:</span>{" "}
                      <span className="font-semibold text-gray-800 uppercase">{order.paymentMethod}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Date:</span>{" "}
                      <span className="font-semibold text-gray-800">{order.date}</span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium text-gray-500">Total Price:</span>{" "}
                      <span className="font-bold text-gray-900">${order.totalAmount}</span>
                    </p>
                  </div>

                  {/* Status Dropdown selector */}
                  <div className="flex flex-col gap-1.5 items-start lg:items-end shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        Status:
                      </span>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadgeStyles(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="h-10 border border-gray-300 rounded outline-none px-3 text-xs bg-white text-gray-800 font-medium cursor-pointer w-full sm:w-40 focus:border-black focus:ring-1 focus:ring-black"
                    >
                      {ORDER_STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
