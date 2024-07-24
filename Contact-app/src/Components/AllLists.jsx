import React from "react";
import List from "./List";
import WelcomeMessage from "./WelcomeMessage";
import { AllItemsContext } from "../Context/AllListsContext";
import { useContext } from "react";

const AllLists = () => {
  const { allItems, searchInputValue } = useContext(AllItemsContext);
  return (
    <div
      className="w-full h-[400px] overflow-y-auto mt-5 flex flex-col gap-3 relative  "
      id="scrollable-container"
    >

      {
        // it the no list are present in the allitems its show welcome message 
      }
      {allItems.length === 0 && <WelcomeMessage />}

      { // heres we make a conndition  if the searchInputValue in undefined mean on one search the element so display all the elemnts on the ui but when we seach the element searchinputvalue will be equal to seach item and its check if the seach value present in the allitems display the list in which seach value is present ohterwise print welcomemessage 
      }
      {allItems.map((item, index) =>
        searchInputValue === undefined ? (
          <List key={index} item={item} index={index} />
        ) : item.name.includes(searchInputValue) ? (
          <List key={index} item={item} index={index} />
        ) : (
          <WelcomeMessage />
        )
      )}
    </div>
  );
};

export default AllLists;
