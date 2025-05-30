import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { CardSkeleton, TaskCard } from '../../export';

const AllTask = ({ tasks, heading }) => {
  const { loading } = useSelector(state => state.taskSlice);

  if (loading) {
    return <CardSkeleton />;
  }

  return (
    <div className="px-6 py-8">
     <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-10 ">{heading}</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks && tasks.length === 0 ? (
          <p className="text-center text-sm text-gray-500 col-span-full">There are no tasks</p>
        ) : (
          tasks.map((item) => <TaskCard key={item.$id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default memo(AllTask);
