import React, { useState } from "react";
import { FiPackage, FiUser, FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrderServices from "../../../appwrite/orders";

const ORDER_STATUS_OPTIONS = [
  "Order Placed",
  "Packing",
  "Dispatched",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

// Statuses that are terminal — no further changes allowed
const TERMINAL_STATUSES = ["Delivered", "Cancelled"];

// Given a current status, return only the statuses that are forward in the pipeline
const getForwardStatuses = (currentStatus) => {
  const currentIndex = ORDER_STATUS_OPTIONS.indexOf(currentStatus);
  // If current status isn't in the list or is terminal, no options available
  if (currentIndex === -1 || currentIndex >= ORDER_STATUS_OPTIONS.length - 2) {
    return [];
  }
  // Return statuses that come after the current one (excluding "Cancelled" which is last)
  const forward = ORDER_STATUS_OPTIONS.slice(currentIndex + 1);
  // Move "Cancelled" to the end of available options (it's always an option from any non-terminal state)
  const withoutCancelled = forward.filter(s => s !== "Cancelled");
  const hasCancelled = forward.includes("Cancelled");
  return hasCancelled ? [...withoutCancelled, "Cancelled"] : withoutCancelled;
};

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

// Helper to parse image from various formats (string URL, stringified JSON array, etc.)
const getProductImage = (image) => {
  if (!image) return "";
  if (Array.isArray(image)) {
    const first = image[0];
    if (first && typeof first === 'string' && first.startsWith('["')) {
      try { return JSON.parse(first)[0]; } catch (e) { /* ignore */ }
    }
    return first || "";
  }
  if (typeof image === 'string') {
    if (image.startsWith('["') || image.startsWith('[')) {
      try { return JSON.parse(image)[0]; } catch (e) { /* ignore */ }
    }
    return image;
  }
  return String(image);
};

const OrdersTab = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['adminOrders'],
    queryFn: async () => {
      const res = await OrderServices.getAllOrders();
      console.log('Admin getAllOrders response:', res);
      if (!res || !res.documents) return [];
      
      // Orders now contain delivery info directly (firstName, lastName, street, city, etc.)
      // No need to fetch user data separately
      return res.documents;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await OrderServices.updateOrderStatus(id, status);
    },
    onSuccess: (res, variables) => {
      if (res) {
        toast.success(`Order status updated to "${variables.status}"`);
        queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      } else {
        toast.error('Failed to update status');
      }
    },
    onError: () => toast.error('Failed to update status')
  });

  const handleStatusChange = (order, newStatus) => {
    // Prevent changing terminal orders
    if (TERMINAL_STATUSES.includes(order.status)) {
      toast.error(`Cannot change status: order is already "${order.status}"`);
      return;
    }
    // Prevent rolling back to a previous status
    const available = getForwardStatuses(order.status);
    if (!available.includes(newStatus)) {
      toast.error('Cannot rollback to a previous status');
      return;
    }
    updateStatusMutation.mutate({ id: order.$id, status: newStatus });
  };

  const filteredOrders = statusFilter === "All"
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  const getCustomerName = (order) => {
    const first = order.firstname || '';
    const last = order.lastname || '';
    const name = [first, last].filter(Boolean).join(' ');
    return name || order.emailaddress || 'Unknown User';
  };

  const getCustomerPhone = (order) => order.phone || '—';

  const getCustomerEmail = (order) => order.emailaddress || '—';

  const getCustomerAddress = (order) => {
    const parts = [order.street, order.city, order.state, order.zipcode, order.country].filter(Boolean);
    return parts.length > 0 ? parts.join(', ') : '—';
  };

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

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 font-medium animate-pulse">Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[30vh] bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8">
          <p className="text-gray-500 text-sm">No orders found matching your criteria.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredOrders.map((order) => {
            const imgSrc = getProductImage(order.image);
            return (
              <div
                key={order.$id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-5 transition-all shadow-sm items-start"
              >
                {/* Left side: Product Image */}
                <div className="col-span-1 lg:col-span-1 flex items-center justify-center py-2 shrink-0">
                  {imgSrc ? (
                    <img src={imgSrc} alt={order.title} className="w-16 h-16 object-cover rounded-md border border-gray-100" />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 text-gray-400">
                      <FiPackage className="text-3xl" />
                    </div>
                  )}
                </div>

                {/* Middle side: Ordered Items & Shipping Details */}
                <div className="col-span-1 lg:col-span-7 flex flex-col gap-3">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 leading-relaxed">
                      <span>
                        {order.title} x {order.quantity}{" "}
                        {order.size && (
                          <span className="text-xs font-normal text-gray-500">
                            ({order.size})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Customer details — clean card with icons and labels */}
                  <div className="border-t border-gray-100 pt-3 mt-1">
                    <h4 className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Shipping Details
                    </h4>
                    <div className="bg-gray-50 rounded-md p-3 space-y-2">
                      <div className="flex items-start gap-2.5">
                        <FiUser className="text-gray-400 shrink-0 mt-0.5" size={14} />
                        <div>
                          <p className="text-xs font-semibold text-gray-900">
                            {getCustomerName(order)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <FiMapPin className="text-gray-400 shrink-0 mt-0.5" size={14} />
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {getCustomerAddress(order)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <FiPhone className="text-gray-400 shrink-0" size={14} />
                        <p className="text-xs text-gray-600">{getCustomerPhone(order)}</p>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <FiMail className="text-gray-400 shrink-0" size={14} />
                        <p className="text-xs text-gray-600 truncate">{getCustomerEmail(order)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side: Payment, Date, total, status selector */}
                <div className="col-span-1 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-start gap-4 lg:gap-3 lg:text-right w-full text-xs text-gray-700">
                  <div className="flex flex-col gap-1 text-left lg:text-right">
                    <p>
                      <span className="font-medium text-gray-500">Items:</span>{" "}
                      <span className="font-semibold text-gray-800">{order.quantity}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Method:</span>{" "}
                      <span className="font-semibold text-gray-800 uppercase">{order.method}</span>
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Date:</span>{" "}
                      <span className="font-semibold text-gray-800">{new Date(order.$createdAt).toLocaleDateString()}</span>
                    </p>
                    <p className="text-sm mt-1">
                      <span className="font-medium text-gray-500">Total Price:</span>{" "}
                      <span className="font-bold text-gray-900">${order.total}</span>
                    </p>
                  </div>

                  {/* Status Dropdown selector */}
                  <div className="flex flex-col gap-1.5 items-start lg:items-end shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                        Status:
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${getStatusBadgeStyles(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {TERMINAL_STATUSES.includes(order.status) ? (
                      <div className="flex items-center gap-1.5 h-10 w-full sm:w-40 px-3 bg-gray-100 border border-gray-200 rounded text-xs text-gray-400 font-medium cursor-not-allowed">
                        <FiPackage className="shrink-0" size={12} />
                        <span>Status locked</span>
                      </div>
                    ) : (
                      <>
                        <select
                          onChange={(e) => handleStatusChange(order, e.target.value)}
                          defaultValue=""
                          className="h-10 border border-gray-300 rounded outline-none px-3 text-xs bg-white text-gray-800 font-medium cursor-pointer w-full sm:w-40 focus:border-black focus:ring-1 focus:ring-black"
                        >
                          <option value="" disabled>
                            — Select next status —
                          </option>
                          {getForwardStatuses(order.status).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-gray-400 italic">
                          Forward statuses only
                        </p>
                      </>
                    )}
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
