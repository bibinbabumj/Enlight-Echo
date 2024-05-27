import { useEffect, useRef, useState } from "react";

const InPageTabNavigation = ({ tabs,defaultActiveTabIndex=0 ,defaultHiddenTabs,children}) => {
    const activeTabLineRef = useRef(null);
    const activeTabRef = useRef(null);
    const [inPageTabNav, setInPageTabNav] = useState(defaultActiveTabIndex);

 // Function to change the active tab state and move the underline    
  const changePageState=(btn,index)=>{
    let {offsetWidth,offsetLeft}=btn
    if (activeTabLineRef.current) {
        activeTabLineRef.current.style.width = `${offsetWidth}px`;
        activeTabLineRef.current.style.left = `${offsetLeft}px`;
    }
    setInPageTabNav(index)
  }

 // Effect to set the initial position of the underline 
  useEffect(()=>{
    if (activeTabRef.current) {
        changePageState(activeTabRef.current, defaultActiveTabIndex);
    }
  },[defaultActiveTabIndex])


  return (
    <>
      <div className=" relative mb-8 bg-white border-b border-grey/10 flex flex-nowrap overflow-x-auto">
        {tabs.map((tab, index) => {
          return (
            <button 
            ref={index === defaultActiveTabIndex ? activeTabRef : null}
            key={index} 
            className={`py-3 px-4 capitalize ${inPageTabNav === index ? "text-black" : "text-gray-400 "}
            ${defaultHiddenTabs.includes(tab)&&"md:hidden"}
            `}
            onClick={(e)=>{changePageState(e.target,index)}}>
              {tab}
            </button>
          );
        })}
        <hr ref={activeTabLineRef}  className="absolute bottom-0 duration-300 border-black/50 transition-all" /> 
      </div>
      {Array.isArray(children)?children[inPageTabNav]:children}
    </>
  );
};

export default InPageTabNavigation;
