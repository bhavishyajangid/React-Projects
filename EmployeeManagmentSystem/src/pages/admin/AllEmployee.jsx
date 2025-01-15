import React, { useCallback, useEffect, useState } from 'react'
import authServices from '../../Appwrite/Auth'
import dataBaseServices from '../../Appwrite/Database'
import { AiTwotoneDelete } from "react-icons/ai";
import UserCard from '../../components/UserCard';
import { ChatBox, UserSkeleton } from '../../export';

const AllEmployee = () => {
  const [alluser , setAllUser] = useState(null)

    useEffect(() => {
         dataBaseServices.getAllUser()
         .then((res) => {
            if(res){
              setAllUser(res.documents)
            }
         })
         .catch((error) => {
           console.log(error);
         })       
    } , [])


    if(!alluser){
      return <UserSkeleton/>
    }
  return (
    <div className='w-full px-14 mt-10 flex flex-col gap-5 max-md:px-6 relative '>
     {
      alluser.length < 0 ? <p>empolyee not found</p>:
      alluser?.map((user ) => (
         <UserCard key={user.$id} details={user}/>
      ))
     }


    <ChatBox/>
    </div>
  )
}

export default AllEmployee