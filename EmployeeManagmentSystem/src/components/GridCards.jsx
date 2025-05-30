
import { useSelector } from 'react-redux';
import MiniCard from './MiniCard';
import { Link } from 'react-router';
const GridCards = ({option , heading}) => {
  return (
    <div className="flex-1 px-1 md:p-5">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">{heading}</h1>
     <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
           {
            option &&
              option.map((item , index) => (
                 <Link to={item.link}>
                 <MiniCard key={index} item={item}/>
                 </Link>
              ))
           }
        </div>
        </div>
  )
}

export default GridCards