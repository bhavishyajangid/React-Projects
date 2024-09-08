import "./App.css";
import RightContainer from "./Components/RightContainer";
import LeftContainer from "./Components/LeftContainer";

function App() {
  return (
    <>
      <div
        className="w-screen min-h-screen shadow-boxShadow rounded-[28px] overflow-auto bg-customGradient flex py-24 max-2xl:py-10 max-xl:items-center  max-xl:px-5   max-xl:flex-col  "

      >
        <LeftContainer />
        <RightContainer />
      </div>
    </>
  );
}

export default App;
