import { Link, Outlet } from "react-router-dom";
import { logo } from "../assets/images/index.js";
import { useState, useCallback, useContext } from "react";
import { UserContext } from "../App";
import UserNavMenu from "./UserNavMenu.jsx";

const Navmenu = () => {
  const [searchBoxVibility, setSearchBoxVibility] = useState(false);
  const [userNavMenuVisibility,setUserNavMenuVisibility]=useState(false)
  const { mUserAuth, mUserAuth: { profile_img, access_token } = {} } =
    useContext(UserContext);

  console.log(mUserAuth + "bibin");
  console.log(profile_img + "bibin");
  console.log(access_token + "bibin");

  const mUserNavMenuVisibility=useCallback(()=>{
    setUserNavMenuVisibility((currentValue)=>!currentValue)
  },[setUserNavMenuVisibility])

  const mSearchBoxVisibility = useCallback(() => {
    setSearchBoxVibility((currentValue) => !currentValue);
  }, [setSearchBoxVibility]);


  const onHandleBlur=useCallback(()=>{
    setTimeout(()=>{
      setUserNavMenuVisibility(false)
    },200)
    
  },[setUserNavMenuVisibility])

  console.log(searchBoxVibility);
  return (
    <>
      <nav className="nav-menu">
        <Link to="/" className="w-8 flex-none">
          <img src={logo} className=" w-full" />
        </Link>

        <div
          className={`absolute bg-white w-full left-0 top-full border-b border-violet/10 mt-1 py-2 px-[3vw]
        md:border-0 md:relative md:block md:inset-0 md:p-0 md:show ${
          searchBoxVibility ? "show" : "hide "
        }`}
        >
          <input
            type="text"
            placeholder="search"
            className="w-full md:w-auto bg-gray-100 py-2 pl-4 pr-[12%] rounded-full placeholder:text-dark-grey  md:pl-8 md:pr-4"
          />
          <i className="fi fi-rr-search absolute max-md:right-[6%] md:pointer-events-none top-1/2 -translate-y-1/2 text-l text-dark-grey md:flex md:ml-2 md:mb-1 " />
        </div>

        <div className="flex items-center gap-3  ml-auto">
          <button
            className="md:hidden bg-gray-100 w-10 h-10 rounded-full flex justify-center items-center"
            onClick={mSearchBoxVisibility}
          >
            <i className="fi fi-rr-search text-m" />
          </button>

          <div></div>

          <Link to="/editor" className=" hidden md:flex gap-2 link">
            <i className="fi fi-rr-drawer-alt"></i>
            <p className=" text-center items-center ">Write </p>
          </Link>

          {access_token ? (
            <>
              <Link to="/dashboard/notification">
                <button className="w-10 h-10 relative rounded-full bg-grey/20 hover:bg-black/20 block ">
                  <i className="fi fi-rr-bell " />
                </button>
              </Link>
              <div className=" relative">
                <button className="w-12 h-12 relative rounded-full bg-grey/20 hover:bg-black/20 block" onClick={mUserNavMenuVisibility} onBlur={onHandleBlur}>
                  <img src={profile_img}  className="w-full h-full object-cover rounded-full overflow-hidden"/>
                </button>

                {userNavMenuVisibility && <UserNavMenu/> }
                
              </div>
            </>
          ) : (
            <>
              <Link
                className="btn-dark py-2 text-m text-base lg:text-lg"
                to="/signin"
              >
                Sign In
              </Link>
              <Link
                className="btn-dark btn-light py-2 text-m text-base lg:text-lg hidden md:block"
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navmenu;
