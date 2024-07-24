import React, { useRef, useContext, useState } from "react";
import { AllItemsContext } from "../Context/AllListsContext";
import { RxCross2 } from "react-icons/rx";

// here we intrect the function which is providing by alllistscontext using use context
const DetailsForm = () => {
  const {
    addItem,
    closeAddComponent,
    name,
    email,
    isEditBtnChecked,
    setIsEditBtnChecked,
    setName, 
    setEmail, 
    editItem
  } = useContext(AllItemsContext);

 //make a default name and email which proivde to new item name and email 
  const [defaultName ,setDefaultName] = useState("")
  const [defaultEmail ,setDefaultEmail] = useState("")

// make a function which is call when the form is submit
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // check if the edit btn is not clicked if edit btn is clicked not making new item  edit the item present item
    if(!isEditBtnChecked){
      if(defaultEmail === ""  || defaultName === " "){
        alert("fill all the coloum")
      }else{
        addItem(defaultName, defaultEmail);
        closeAddComponent()
      }
    }
    // if edit btn is clicked its call the function edit item and setiseditbtnchecked to false and close the add form comp
    else{
      editItem()
      setIsEditBtnChecked(false)
      closeAddComponent()
    }
  };


 // set if the cross btn is clicked its close the form and set the value of setiseditbtnclicked to false
  const closeTheForm = () => {
    closeAddComponent();
    setIsEditBtnChecked(false);
  };


  // handleinput run when the input value is changed 
  const handleInput = (event) => {
    if(event.target.name === "name"){

      // heres we check if the edit btn is not clicked making a new item set the name and email to default hook but if edit btn is clicked set the value of setkname because its not make a new item its edit the item
      setDefaultName(event.target.value)
      if(isEditBtnChecked){
        setName(event.target.value)
      }
    }else if(event.target.name === "email"){
      setDefaultEmail(event.target.value)
    if(isEditBtnChecked){
      setEmail(event.target.value)
    }
    }
  };
  return (
    <div
      className={`w-[350px] h-[90vh] bg-black bg-opacity-70 absolute z-10  rounded-xl p-4 flex justify-center items-center right-0 bottom-0`}
    >
      <form
        className="w-full h-52 bg-white rounded-lg text-black px-3 py-6 relative"
        onSubmit={(event) => {
          handleFormSubmit(event);
        }}
      >
        <RxCross2
          className="absolute right-2 text-lg top-2 cursor-pointer"
          onClick={closeTheForm}
        />
        <label htmlFor="name" className="">
          Name
        </label>
        <br />
        <input
        value={isEditBtnChecked === true ? name : defaultName}
        onChange={(event) =>{handleInput(event)} }
          type="text"
          name="name"
          id="name"
          className="w-full h-8 border-black border-solid border px-1 outline-none rounded-sm"
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          value={isEditBtnChecked === true ? email : defaultEmail}
          onChange={(event) =>{handleInput(event)} }
          type="email"
          name="email"
          id="email"
          className="w-full h-8 border-black border-solid border px-1 outline-none rounded-sm"
        />
        <br />
        <button className="min-w-32 h-9 rounded-sm text-md bg-yellow-400 p-2 capitalize mt-6 absolute right-2">
          {isEditBtnChecked === true ? "Edit Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

export default DetailsForm;
