
import { useDispatch } from "react-redux";
import { filterCategory } from "../Store/Catogries";

const Lists = ({ item }) => {
const dispatch = useDispatch()
  return (
    <div
      onClick={() => {
        dispatch(filterCategory(item.category))
      }}
      className="w-32 h-full   flex flex-col justify-around items-center cursor-pointer"
    >
      <img className="w-20 h-20 rounded-full" src={item.img} alt="" />
      <span className="text-gray-600 capitalize text-md font-serif ">
        {item.category}
      </span>
    </div>
  );
};

export default Lists;
