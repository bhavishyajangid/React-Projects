import React, {  useEffect } from 'react'
import TotalPayment from './TotalPayment'
import { Form,   redirect,  useActionData, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, paymentDone } from '../Store/OrdersDetails'
import { handleOrderedItems } from '../Store/orders'


const PaymentInfo = () => {
  const {itemsInCart , Quantity} = useSelector(state => state.addToCart)
  const {FoodData} = useSelector(state => state.Items)
   const data = useActionData()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   

 
   useEffect(() => {
      if (data) { 
        alert('order placed sucessfully')
         dispatch(getOrderDetails(data));
         dispatch(handleOrderedItems({Quantity , itemsInCart , FoodData }))
        navigate('/orders')
      }
    }, [data]);
   
   
  return (
    <div style={{ minHeight: 'calc(100vh - 4rem)' }} className='w-5/6 m-auto flex pt-16 max-md:pt-4  max-md:flex-col max-sm:gap-3 '>
      <div className='w-1/2 max-md:w-full  flex flex-col   p-1 '> 
        <h1 className='text-3xl font-medium max-sm:text-2xl '>Delivery Inforamtion</h1>
        <Form method="POST" className=' w-4/5 max-sm:w-[98%]  h-72  flex flex-col justify-evenly mt-10 max-md:mt-5' action="">
        <div className='w-full h-8 flex  justify-between'>
           <input className='w-[48%] h-8   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name='firstname' placeholder='First name' required />
           <input className='w-[48%]   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name='lastname' placeholder='Lastname'  required/>
        </div>

           <input className='w-full h-8  border-solid border-gray-500 border text-sm pl-2 rounded-sm mt-2 ' type="text" name='email' placeholder='Email address'required />
           <input className='w-full h-8  border-solid border-gray-500 border text-sm pl-2 rounded-sm mt-2 ' type="text" name="street" placeholder='Street' required/>

           <div className='w-full h-8 flex mt-2  justify-between'>
           <input className='w-[48%] h-8   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name='city' placeholder='City' required />
           <input className='w-[48%]   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name="state" placeholder='State' required/>
        </div>

        <div className='w-full h-8 flex mt-2 justify-between'>
           <input className='w-[48%] h-8   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name='zipcode' placeholder='Zip code' required/>
           <input className='w-[48%]   border-solid border-gray-500 border text-sm pl-2 rounded-sm' type="text" name='country' placeholder='Country' required/>
        </div>

           <input className='w-full h-8  border-solid border-gray-500 border text-sm pl-2 rounded-sm mt-2 ' type="number" name='number' placeholder='Phone' required />
       
        <button type='submit' className=' w-full h-10 rounded-md bg-orange-500 text-white text-ld mt-3 font-medium border-none '>Place order</button>
        
        </Form>
      </div>



<TotalPayment visible={"none"}/>


    
    </div>
  )
}

export default PaymentInfo

export const handleFormData = async(data) =>{
    const data2 = await data.request.formData()
    const formData = Object.fromEntries(data2)
     return formData
    
   
}

