import React, { lazy, Suspense } from 'react'
import { CardSkeleton, EmployeeTask, Loader, Tasks } from '../../export'
const AdminTask = React.lazy (() => import("../../components/AdminTask"))
import { useSelector } from 'react-redux';
const AdminAddedTask= ({allTask , loader}) => {
  const {adminTask} = useSelector(state => state.adminSlice)
  // if(loader){
  //   return <Loader/>
  // }
  return (
    <div className='px-14 max-sm:px-5'>
        <div className='grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-5 max-md:justify-items-center mt-10 '> 
          {
            
            allTask.length === 0 ? (
            <p className='text-sm text-center mt-10'>There are no tasks</p>
            ) :
            (
              <Suspense  fallback={<CardSkeleton />}>
               {
                allTask.map((item) => (
                   <AdminTask key={item.$id} item={item}/>
                ))
               }
             </Suspense>
            )
          }
          
         </div>
    </div>
  )
}

export default AdminAddedTask