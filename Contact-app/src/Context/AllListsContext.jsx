import { Children, createContext, useEffect, useReducer, useState } from "react";
import App from "../App";

export const AllItemsContext = createContext({

  allItems: [],
  addItem: () => {},
  closeAddComponent : () =>{} ,
  deleteItem : () =>{} ,
  editItem : () =>{} ,
  providingNameOrEmail : () =>{} ,
  setIsEditBtnChecked : () =>{} ,
  setName: () =>{} ,
  setEmail : () =>{} ,
  setSearchInputValue : () =>{} ,
  isAddBtnClicked : false, 
  name : "" , 
  email : "" ,
  searchInputValue : "" ,
  isEditBtnChecked : false ,


});


const handleAllItmes = (currentValue, action) => {
  //make a global varibel which is contain whole items 
  let newItem = currentValue
 

  // if the add item function is run its add a new object in the newitem
  
  if (action.type === "ADD_ITEM") {
    newItem = [ ...currentValue, { name :action.payload.name , email : action.payload.email }];

    // if delete item function is run its delete the item of which list index is giving 
  }else if(action.type === "DELETE_ITEM"){ 
    newItem = [...currentValue];
    newItem.splice(action.payload.index, 1);

    // it edit the item based on the index which btn is clicked 
  }else if(action.type === 'EDIT_ITEM'){
         newItem = [...currentValue];
         newItem[action.payload.index].name = action.payload.name;
         newItem[action.payload.index].email = action.payload.email;
  } else if (action.type === 'INITIALIZE') {
    newItem = action.payload; // Initialize with data from localStorage
  }

    
  
  

  // return the newitem
  return newItem;
};



const AllItemsContextProvider = ({ children }) => {
  // heres we store all the value of the elements by usestate
    const [isAddBtnClicked , setIsAddBtnClicked]  = useState(false)
    const [isEditBtnChecked , setIsEditBtnChecked] = useState(false);
    const [name , setName ] = useState()
    const [email , setEmail ] = useState()
    const [index , setIndex] = useState()
  const [searchInputValue , setSearchInputValue]  = useState()

  


  

    // heres we usereducer to update anything  in the ui 
  const [allItems, dispatchAllItems] = useReducer(handleAllItmes, []);

 
// get data from local storage and set into the allitems
  useEffect(()=>{
    const allContact = JSON.parse(localStorage.getItem("allItem"))
    console.log(allContact + "this is");
    if(allContact && allContact.length > 0){
      dispatchAllItems({ type: "INITIALIZE", payload: allContact });
    }
  } , [])

  // set data to local storage when the new item is create
  useEffect(()=>{
    localStorage.setItem("allItem" , JSON.stringify(allItems))
  }, [allItems])

  
  



  //make add item funciton
  const addItem = (name, email) => {
    dispatchAllItems({
      type: "ADD_ITEM",
      payload: {
        name,
        email,
      },
    });
  };

  // make edit item function
  const editItem = () =>{
    dispatchAllItems({
        type: "EDIT_ITEM",
        payload : {
         name : name , 
         email : email , 
         index : index,
        }
    })
  }

  // make deleteitem function which pass the index to handleAllItmes to delete the item
   const deleteItem = (index) =>{
    dispatchAllItems({
        type: "DELETE_ITEM",
        payload : {
            index
        }
    })
   
  }



   // we make a function open or close the additem form component  
 
  const closeAddComponent = () =>{
    setIsAddBtnClicked(prev => !prev)
}  


// heres we provide the index name and email of which index number item is changed to the usestate
const providingNameOrEmail = (name, email , index) =>{
  setName(name);
  setEmail(email)
  setIndex(index)

}

return (

    <AllItemsContext.Provider
    // pass all the accesseble elements to the components
      value={{
        allItems,
        addItem,
        isAddBtnClicked,
        closeAddComponent , 
        deleteItem, 
        editItem, 
        providingNameOrEmail, 
        name, 
        email , 
        isEditBtnChecked, 
        setIsEditBtnChecked,
        setName, 
        setEmail,
        searchInputValue , 
        setSearchInputValue
       
        
      }}
    >

      {children}
    </AllItemsContext.Provider>
  );
};

export default AllItemsContextProvider;
