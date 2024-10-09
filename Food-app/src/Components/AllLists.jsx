
import Lists from './Lists';
import { useSelector } from 'react-redux';

const AllLists = () => {
  const {category} = useSelector(state => state.category);

  
  return (
    <div className='w-5/6 h-36  flex  m-auto mt-7 overflow-x-auto scrollbar-hide  border-solid border-b-[1px] border-gray-300 max-sm:w-full ' id='menu'>
      <div className='flex gap-2'>

        {
          category.map((item, index) => (
            <Lists key={index} item={item} />
          ))
        }


      </div>
    </div>
  );
}

export default AllLists;
