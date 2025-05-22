import React, { memo } from 'react';
import { Link } from 'react-router';
import { Tasks, CardSkeleton } from '../../export';
import { useSelector } from 'react-redux';

const AllTask = ({tasks , heading}) => {
  console.log(tasks);
  
  const { loading } = useSelector(state => state.taskSlice);
  const {currentUserDetails} = useSelector(state => state.authSlice)

  
  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className='px-14 max-md:px-5'>
      <h1 className='text-3xl text-center text-white font-semibold mt-10'>{heading}</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(25rem,1fr))] gap-5 mt-10">
        {tasks && tasks.length === 0 ? (
          <p className="text-sm text-center mt-10">There are no tasks</p>
        ) : (
          tasks.map((item) => 

            <Link key={item.$id} to={`/id/${item.$id}`}>
                  <Tasks item={item} />
            </Link>

          )
        )}
      </div>
    </div>
  );
};

export default memo(AllTask)
