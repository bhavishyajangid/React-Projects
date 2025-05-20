import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dataBaseServices from '../../Appwrite/Database'
import { handleCompletedTask } from '../../Store/thunks/taskThunk'
import { showError } from '../../utlity/Error&Sucess'
import { Loader, Tasks } from '../../export'
import { Link } from 'react-router'

const CompletedTask = () => {
    const {completedTask , loading} = useSelector(state => state.taskSlice)
    const dispatch = useDispatch()
    
  //   useEffect(() => {
  //        const completedTaskFetch = async () => {
  //   try {
  //     await dispatch(handleCompletedTask()).unwrap();
  //   } catch (error) {
  //     console.log(error);
  //     showError(error);
  //   }
  // };

  // completedTaskFetch();
  //   } , [])

     if (loading) {
    return <Loader/>
  }
 console.log(completedTask , "completedtask");
 
  return (
     <div className='px-14 max-md:px-5'>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-5 mt-10">
        {completedTask.task && completedTask.task.length === 0 ? (
          <p className="text-sm text-center mt-10">There is not completedTask</p>
        ) : (
          completedTask.task.map((item) => 
           <Link key={item.$id} to={`/id/${item.$id}`}>
                  <Tasks item={item}/>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default CompletedTask