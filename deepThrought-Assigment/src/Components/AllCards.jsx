import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import CardOneImg from "./CardOneImg";
import CardTwoPart from "./CardTwoPart";
import CardThirdPart from "./CardThirdPart";
import FourthCardPart from "./FourthCardPart";
const AllCards = () => {
  let arr = [CardOneImg, CardTwoPart, CardThirdPart, FourthCardPart];
  const [data, setdata] = useState([ 
{
"asset_id": 18883,
"asset_title": "Technical Project Management",
"asset_description": "Story of Alignment\r\nScope of Agility\r\nSpecific"
},
{
"asset_id": 18884,
"asset_title": "Threadbuild",
"asset_description": "Watch the video and thread build, and jot out key threads"

},
{
"asset_id": 18885,
"asset_title": "Structure you pointers ",
"asset_description": "Write a 400-500 word article, from your thread. Publish your understanding, and showcase your learning to the entire world.",

},
{
"asset_id": 18886,
"asset_title": "4SA Method",
"asset_description": "To explore more read more",
}
]);

  // useEffect(() => {
  //   fetch('https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project')
  //   .then((res) => res.json())
  //   .then((res) => setdata(data)
  //   )
  // } , [] )
  // api is not working so ill make like this
  return (
    <div className="w-full flex justify-between flex-wrap gap-5 mt-20 max-xl:justify-center max-xl:gap-8 ">
      {data.map((item, index) => (
        <Cards key={item.id} item={item} comp={arr[index]} />
      ))}
    </div>
  );
};

export default AllCards;
