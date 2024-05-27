import { useCallback } from "react";
import { useState } from "react";


const InputBox = ({ name, type, placeholder, id, defaultValue,icon,className,eye_closed,eye_opened}) => {
  const [passVisible,setPassVisible]=useState(false)

  const togglePasswordVisibility= useCallback(()=>{
    setPassVisible((currentValue)=>!currentValue)
  },[setPassVisible])
  return (
    <div className=" relative w-full mb-4">
      <input
        name={name}
        // type={ type=="password"?(passVisible?"text":"password"):type}
        type={(type === "password" && passVisible) ? "text" : type}
        placeholder={placeholder}
        id={id}
        defaultValue={defaultValue}
        className={className}
      />
   
    <i className={`${icon}`} />

      {type == "password" && <i className={`${passVisible?eye_opened:eye_closed} `}  onClick={togglePasswordVisibility} />}
    </div>

    
  );
};

export default InputBox;
