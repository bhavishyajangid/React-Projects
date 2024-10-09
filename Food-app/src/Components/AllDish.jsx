import Dishes from "./Dishes";
import { useSelector } from "react-redux";

const AllDish = () => {
  const { filterData } = useSelector((state) => state.category);

  return (
    <>
      <div className="w-5/6  m-auto mt-10 max-sm:w-full " id="menu">
        <h1 className="text-black text-2xl mt-5 font-medium max-sm:px-6 ">
          Top dishes near you
        </h1>

        <div className="w-full mt-5 grid  grid-cols-auto-fit-minmax gap-4 max-sm:px-6 max-sm:gap-10">
          {filterData.map((item) => (
            <Dishes key={item.id} item={item} id={item.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDish;
