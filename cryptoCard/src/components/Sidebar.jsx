import React, { useState , useEffect } from "react";
import SidebarOption from "./SidebarOption";
const Sidebar = ({isOpen}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  let sideBarOption = [
    { 
      name : "Wallet", 
      Link : "/wallet"
    },
    {
      name : "Ring",
      Link : "/ring"
    },
    {
      name : "Partnership",
      Link : "",
      subOption : [
         {   name : "Reseller" , 
             Link : "/reseller"
         },
         {
          name : "Referral Program",
          Link : "/referall"
         },
         {
          name : "Co-branding",
          Link : "/brading"
         }
      ]
    },
    {
      name : "Community",
      Link : "" ,
      subOption : [
        { 
          name : "Twitter",
          image : '/twitter.png',
          Link : "/twitter"
        },
        { 
          name : "Telegram",
          image : '/telegram.png',
          Link : "/telegram"
        },{ 
          name : "Discord",
          image : '/discord.png',
          Link : "/discord"
        },{ 
          name : "Facebook",
          image : 'facebook.png',
          Link : "/facebook"
        },{ 
          name : "Instagram",
          image : '/instagram.png',
          Link : "/instgram"
        },

      ]
    },
    {
      name : "More",
      Link : "",
      subOption : [
        {
          name : "Company",
           Link : "/company"
        },
        {
          name : "Blog",
          Link : "/blog"
        } ,{
          name : "Help Center",
          Link : "/help"
        }
      ]
    },
    {
         name : 'Language' ,
         image : "/language.png" , 
         subOption : [
          {
            name : 'English',
           
          }
        ]
     }
]

  return (

  
    <div
      className={`absolute top-20 right-0  w-full  h-screen bg-black z-40 transition-transform duration-300 overflow-y-auto pl-8 pr-10  ${
        isOpen ? "translate-x-0 " : " translate-x-full"
      }`}
    >
     {
       sideBarOption.map((item) => (
         <SidebarOption key={item.name} option={item}/>
       ))
     }

<div className="reletive flex justify-center items-center">
<button className="w-11/12 py-2.5 bg-[linear-gradient(to_right,_#66ccffb3,_#09f)]  outline-none text-white font-semibold text-lg rounded-2xl absolute bottom-40  ">Launch Wallet</button>

</div>
    </div>
  );
};

export default Sidebar;
