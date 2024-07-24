import React, { useContext } from "react";
import user from "../assets/user.png";
import remove from "../assets/remove.png";
import edit from "../assets/edit.png";
import { AllItemsContext } from "../Context/AllListsContext";

const List = ({ item, index }) => {
  // intrect the functions and elements which is provided by allitemscontext using usecontext
  const {
    deleteItem,
    closeAddComponent,
    providingNameOrEmail,
    setIsEditBtnChecked,
  } = useContext(AllItemsContext);

  // when the edit btn is clicked pass the actual value of the list
  const handleEditBtn = (name, email, index) => {
    providingNameOrEmail(name, email, index);
    closeAddComponent();
    setIsEditBtnChecked(true);
  };

  return (
    <div className="w-full h-14 rounded-lg bg-[#ffeaae]  flex  items-center ">
      <img className="p-2" src={user} alt="profile" />
      <div className="leading-tight w-52">
        <span className="font-medium text-mg capitalize">{item.name}</span>
        <br />
        <span className="text-sm ">{item.email}</span>
      </div>
      <span className="cursor-pointer mr-1">
        <img
          onClick={() => {
            handleEditBtn(item.name, item.email, index);
          }}
          src={edit}
          alt=""
        />
      </span>
      <span className="cursor-pointer mr-1">
        <img
          src={remove}
          onClick={() => {
            deleteItem(index);
          }}
          alt=""
        />
      </span>
    </div>
  );
};

export default List;
