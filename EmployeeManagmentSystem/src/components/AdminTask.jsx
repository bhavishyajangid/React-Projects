import React from 'react'
import { Link } from 'react-router';
import { LuMessageSquareText } from "react-icons/lu";
const AdminTask = ({item}) => {

  const ControleDescriptionText = (text , maxLength) => {
     if(text.length > maxLength){
      return text.slice(0, maxLength) + "........."; 
     }else{
       return text
     }

  }
  return (
 
      
     
         <div className='max-w-96 bg-pink-200 rounded-md p-5 flex flex-col justify-around gap-3 cursor-pointer max-md:max-w-full h-full'>

            <div className='flex justify-between items-center'>
              <div>

               <span className={`${item.Urgent ? "bg-red-500" : "bg-green-500"}  text-gray-200 px-3 py-2 text-sm font-medium rounded-md border-none`}>{item.Urgent ? "Urgent" : "Calm"}</span>
               <span className='text-black font-medium'>{item.Date}</span>

              
              </div>
              
             
            </div>
          <h1 className='text-black capitalize font-medium '>{item.Tittle}</h1>

          <p className=' text-gray-900 text-sm '>{ControleDescriptionText(item.Description , 300)}</p>
           
           <h2 className='text-black font-medium '>Assing To : - {item.AssignTo}</h2>
           <span className={` px-3 w-fit py-2 text-gray-200 font-medium rounded-md border-none text-sm ${item.isCompleted ? "bg-green-500" : "bg-red-500"}`}>{item.isCompleted ? "Completed" : "Not Completed" }</span>
         </div>
  )
}

export default AdminTask