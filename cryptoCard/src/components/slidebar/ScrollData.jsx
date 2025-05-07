const ScrollData = ({ item }) => (
    <div className="h-40 max-w-80 bg-[#1f1f1f]/35 text-white p-5 rounded-lg shadow-md ">
      <h1 className="text-2xl font-semibold">{item.title}</h1>
      <p className=" text-[#6c6c70] mt-3">{item.text}</p>
    </div>
  );
  export default ScrollData;
  