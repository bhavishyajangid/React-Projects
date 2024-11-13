import React, { useEffect, useState } from 'react';
import { Loader, Order } from '../export';
import { useDispatch, useSelector } from 'react-redux';
import OrderServices from '../appwrite/orders';
import { setAllOrders } from '../Store/orders';

const AllOrders = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.authSlice);
  const { allOrders } = useSelector((state) => state.orderSlice);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchOrders = async () => {
      setLoader(true);  // Set loader to true when fetching begins
      try {
        const res = await OrderServices.getOrders(userData.$id);
        if (res) {
          dispatch(setAllOrders(res.documents)); // Dispatch orders to the store
        }
      } catch (error) {
        setError('Failed to fetch orders. Please try again later.'); // Set error state if request fails
        console.error(error); // Log error for debugging
      } finally {
        setLoader(false); // Set loader to false once the request is complete (success or failure)
      }
    };

    if (userData?.$id) {
      fetchOrders(); // Fetch orders only if userData is available
    }

  }, [userData, dispatch]); // Added dispatch to the dependency array

  return (
    <>
      {loader ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div> // Show error message if available
      ) : (
        <div className="w-4/5 max-lg:w-11/12 m-auto">
          <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

          {allOrders.length === 0 ? (
            <p className="text-md text-gray-500 text-center">No Orders Yet</p>
          ) : (
            <div className="w-full flex flex-col gap-5">
              {allOrders?.map((order) => (
                <Order key={order.Id} order={order} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllOrders;
