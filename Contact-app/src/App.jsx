import "./App.css";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import AllLists from "./Components/AllLists";
import Details from "./Components/DetailsForm";
import {useContext } from "react";
import { AllItemsContext } from "./Context/AllListsContext";

function App() {
  const {isAddBtnClicked} = useContext(AllItemsContext)
  
  return (
    
      <div className="w-[350px] h-[90vh] bg-[#323334] p-4 mt-3 rounded-xl relative z-0 ">
        {
        // only show when the add btn is clicked 
      }
        {
         isAddBtnClicked && <Details />
        }
      <Header />
      <SearchBar />
      <AllLists />
      </div>
    
  );
}



export default App;
