import { useState } from "react";
import OrderServices from "../appwrite/orders";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Helper to parse image from various formats
const getProductImage = (image) => {
  if (!image) return "";
  if (Array.isArray(image)) {
    const first = image[0];
    if (first && typeof first === "string" && first.startsWith('["')) {
      try { return JSON.parse(first)[0]; } catch (e) { /* ignore */ }
    }
    return first || "";
  }
  if (typeof image === "string") {
    if (image.startsWith('["') || image.startsWith("[")) {
      try { return JSON.parse(image)[0]; } catch (e) { /* ignore */ }
    }
    return image;
  }
  return String(image);
};

// Map each status to its own dot + text colors
const getStatusStyles = (status) => {
  const s = (status || "").toLowerCase().trim();
  switch (s) {
    case "pending":
      return { dot: "bg-yellow-500", text: "text-yellow-600" };
    case "processing":
    case "confirmed":
      return { dot: "bg-blue-500", text: "text-blue-600" };
    case "shipped":
    case "out for delivery":
      return { dot: "bg-indigo-500", text: "text-indigo-600" };
    case "delivered":
    case "completed":
      return { dot: "bg-green-500", text: "text-green-600" };
    case "cancelled":
    case "canceled":
      return { dot: "bg-red-500", text: "text-red-600" };
    case "refunded":
      return { dot: "bg-orange-500", text: "text-orange-600" };
    default:
      return { dot: "bg-gray-400", text: "text-gray-600" };
  }
};

const Order = ({ order }) => {
  const { userData } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();

  const isCancelled = ["cancelled", "canceled"].includes(
    (order.status || "").toLowerCase().trim()
  );
  const statusStyles = getStatusStyles(order.status);

  const cancelMutation = useMutation({
    // Update the order status to "cancelled" instead of deleting it
    mutationFn: async (id) => {
      setLoader(true);
      return OrderServices.cancelOrder(id);
    },
    onSuccess: (res) => {
      if (res) {
        toast.success("Order Cancelled successfully");
        // Re-fetch so the order stays in the list with its new status
        queryClient.invalidateQueries({
          queryKey: ["userOrders", userData?.$id],
        });
      } else {
        toast.error("TECHNICAL ERROR");
      }
    },
    onError: () => toast.error("TECHNICAL ERROR"),
    onSettled: () => setLoader(false),
  });

  const cancelOrder = (Id) => {
    cancelMutation.mutate(Id);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="py-2 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-6 text-sm">
            <img
              className="w-16 sm:w-20 object-cover rounded"
              src={getProductImage(order.image)}
              alt={order.title}
            />
            <div>
              <p className="sm:text-base font-medium">{order.title}</p>
              <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                <p>Price : ${order.price}</p>
                <p>Quantity: {order.quantity}</p>
              </div>
              <p className="mt-1">
                Date:{" "}
                <span className="text-gray-400">
                  {new Date(order.$createdAt).toLocaleDateString()}
                </span>
              </p>
              <p className="mt-1">
                Payment: <span className="text-gray-400">{order.method}</span>
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-between">
            <div className="flex items-center gap-2">
              <p className={`min-w-2 h-2 rounded-full ${statusStyles.dot}`}></p>
              <p className={`text-sm md:text-base font-medium capitalize ${statusStyles.text}`}>
                {order.status}
              </p>
            </div>
            {!isCancelled && (
              <button
                onClick={() => cancelOrder(order.$id)}
                className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50"
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
