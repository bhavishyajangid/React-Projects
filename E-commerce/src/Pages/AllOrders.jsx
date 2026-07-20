import React from 'react';
import { Loader, Order } from '../export';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import OrderServices from '../appwrite/orders';

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

const AllOrders = () => {
  const { userData } = useSelector((state) => state.authSlice);
  const location = useLocation();

  // Check if we have order data from state (coming from order confirmation)
  const orderState = location.state || {};
  const { orderResponses, cartTotal } = orderState;
  const isFromCheckout = orderResponses && orderResponses.length > 0;

  // Fetch orders using TanStack Query — only when NOT coming from checkout
  const { data: fetchedOrders = [], isLoading, error: queryError } = useQuery({
    queryKey: ['userOrders', userData?.$id],
    queryFn: async () => {
      if (!userData?.$id) return [];
      const res = await OrderServices.getOrders(userData.$id);
      console.log('getOrders response:', res);
      if (res && res.documents) {
        return res.documents;
      }
      return [];
    },
    enabled: !!userData?.$id && !isFromCheckout,
  });

  return (
    <>
      {/* CASE 1: Coming from checkout — show Order Confirmed */}
      {isFromCheckout ? (
        <div className="w-4/5 max-lg:w-11/12 m-auto">
          <h2 className="text-2xl font-semibold mb-6">Order Confirmed</h2>
          <div className="space-y-6">
            {orderResponses.map((orderResponse, index) => (
              <div
                key={orderResponse?.$id || index}
                className="border rounded-lg p-6"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                    src={getProductImage(orderResponse?.image)}
                    alt={orderResponse?.title || "Product"}
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between">
                      <h3 className="font-medium">
                        {orderResponse?.title || "Product"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Order #{(orderResponse?.$id || "").substring(0, 8)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Quantity: </span>
                        <span>{orderResponse?.quantity}</span>
                      </div>
                      <div>
                        <span className="font-medium">Price: </span>
                        <span>${orderResponse?.price}</span>
                      </div>
                      <div>
                        <span className="font-medium">Total: </span>
                        <span>${orderResponse?.total}</span>
                      </div>
                      <div>
                        <span className="font-medium">Date: </span>
                        <span>
                          {new Date(
                            orderResponse?.$createdAt || Date.now()
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="font-medium">
                    Payment Method: {orderResponse?.method || "Not specified"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="text-green-600">
                      {orderResponse?.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}

            {cartTotal && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>SubTotal</span>
                    <span>$ {cartTotal.subTotal || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$ {cartTotal.delivery || 0}</span>
                  </div>
                  {cartTotal.promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        Discount ({cartTotal.discountPercent}% OFF)
                      </span>
                      <span>- $ {cartTotal.discountAmount || 0}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>$ {cartTotal.Total || 0}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* CASE 2: Normal page visit — show Your Orders from DB */
        <>
          {isLoading ? (
            <Loader />
          ) : queryError ? (
            <div className="text-center text-red-500 py-10">
              Failed to fetch orders. Please try again later.
            </div>
          ) : (
            <div className="w-4/5 max-lg:w-11/12 m-auto">
              <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

              {fetchedOrders.length === 0 ? (
                <p className="text-md text-gray-500 text-center">
                  No Orders Yet
                </p>
              ) : (
                <div className="w-full flex flex-col gap-5">
                  {fetchedOrders.map((order) => (
                    <Order key={order.$id} order={order} />
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AllOrders;