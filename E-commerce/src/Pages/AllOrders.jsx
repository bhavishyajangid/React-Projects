import React, { useEffect, useState } from 'react'
import { Loader, Order } from '../export'
import { useDispatch, useSelector } from 'react-redux'
import OrderServices from '../appwrite/orders'
import { setAllOrders } from '../Store/orders'

const AllOrders = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.authSlice)
    const {allOrders , userDetails} = useSelector(state => state.orderSlice)
    const [loader , setLoader] = useState(true)
  useEffect(() => {
    try {
      const result  = OrderServices.getOrders(userData.$id)
      .then((res) => {
         if(res){
           dispatch(setAllOrders(res.documents))
         }
      })
      
      console.log(result, 'data');
    }catch (error) {
      console.log(error);
    }finally{
      setLoader(false)
    }
  }, [userData])

  return (
    <>
    {
      loader ? <Loader/> :  <div className="w-4/5 max-lg:w-11/12 m-auto">
      <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>
  
      <div className="w-full flex flex-col gap-5">
        {allOrders?.map((order) => (
            <Order key={order.Id} order={order} />
        ))}
      </div>
    </div>
    }
   </>
  )
}

export default AllOrders