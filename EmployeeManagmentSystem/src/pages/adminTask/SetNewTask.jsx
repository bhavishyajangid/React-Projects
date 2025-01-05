import dataBaseServices from '../../Appwrite/Database';
import TaskServices from '../../Appwrite/Task';
import Button from '../../components/Button'
import Input from '../../components/Input'
import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Loader } from '../../export';


const SetNewTask = () => {
   const [loader , setLoader] = useState(false)
   const [allTask , setAllTask] = useState([])
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    
  const input = [
     {
       label : "Tittle" ,
       type : "text" ,
       placeholder : "Make a UI design" ,
     },

     {
      label : "Date" ,
      type : "date" ,
      placeholder : "Make a UI design" ,
    },

    {
      label : "AssignTo" ,
      type : "text" ,
      placeholder : "Employee name" ,
    },

    {
      label : "Category" ,
      type : "text" ,
      placeholder : "Design , dev , etc" ,
    },
  ]

  const GiveNewTask = async(data) => {

    try {
      setLoader(true)
       const userTask = await TaskServices.setTask(data)
       if(userTask){
        // console.log(userTask);
        
          setAllTask([userTask , ...allTask])
          console.log(allTask);
          
           toast.success("Task Set Sucessfully")
       }else{
         toast.error("Failed To Set Task")
       }
    } catch (error) {
      toast.error(error)
    } finally{
      setLoader(false)
    }
    

     
  }
  if(loader){
    return <Loader/>
  }
  return (
    
    <div className='w-11/12 min-h-96 m-auto p-5 flex flex-col justify-center    bg-[#1C1C1C] rounded-lg mt-10'>
        <form onSubmit={handleSubmit(GiveNewTask)} className='flex max-sm:flex-col  py-5 ' action="">
            <div className='w-1/2  max-sm:w-full max-sm:pr-0 pr-10 flex flex-col gap-8 '>
            {
              input.map((item) => (
                <Input label={item.label} type={item.type} placeholder={item.placeholder} className="w-full h-9  border border-gray-500 border-solid rounded-lg text-white px-2 bg-transparent outline-none placeholder:text-sm " 

                {...register(`${item.label}`, { required: `${item.label} is required `})}
                
                />  
              ))
            }
           
            </div>

            <div className='w-1/2 max-sm:w-full max-sm:pl-0 max-sm:mt-5 pl-10 flex flex-col max-sm:gap-5  '>
            <div>
               <label htmlFor='description' className="block  text-white text-base">Description</label>
               <textarea className='w-full h-48 outline-none bg-transparent border border-solid border-gray-500 rounded-lg p-2 mt-1 overflow-y-scroll scroll-bar' name="" id="description"
               {...register("Description", { required: `Description is required `})}
               >
               </textarea>

               <div className='flex  gap-2 items-center'>
               <Input className="w-5 h-4" type="checkbox"
               {...register("Urgent")}
               />
               <label htmlFor="">Urgent</label>
               </div>
               
            </div>
               <Button className="w-full h-9 bg-green-500  text-white font-medium rounded-md hover:bg-green-600 mt-9"  btn="Submit" />
            </div>
        </form>
    </div>
  )
}

export default  SetNewTask
