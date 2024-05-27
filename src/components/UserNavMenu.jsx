import { Link } from "react-router-dom";
import { PageAnimation } from "../common/Animation";
import { userNavMenu } from "../constants/index.js";
import { useCallback, useContext } from "react";
import { UserContext } from "../App.jsx";
import { mRemoveUserSession } from "../common/UserSession.jsx";

const UserNavMenu = () => {
  const { mUserAuth: { username } = {}, mSetUserAuth } =
    useContext(UserContext);

   


  const mUserSignOut =useCallback(()=>{
    mRemoveUserSession("user");
    mSetUserAuth({ access_token: null })
  },[mSetUserAuth])

  return (
    <PageAnimation transition={{ duration: 0.2 }}>
      <div className=" bg-white absolute right-0 border border-violet/10 mt-1 w-60 overflow-hidden duration-200">
        {userNavMenu.map((item, index) => (
          <Link
            key={index}
            to={item.path == "/user" ? item.path + "/" + username : item.path}
            className={item.className}
          >
            {item.isIcon ? (
              <>
                <i className={item.icon} />
                <p className=" text-center items-center ">{item.label} </p>
              </>
            ) : (
              <p className=" text-center items-center ">{item.label} </p>
            )}
          </Link>
        ))}

        <span className=" absolute border-t  border-violet/10  w-[100%]"></span>
        <button
          className="text-left p-4 w-full pl-8 hover:bg-grey/30"
          onClick={mUserSignOut}
        >
          <h1 className=" font-bold mb-1 text-l">Sign Out</h1>
          <p className="text-dark-grey">@{username}</p>
        </button>
      </div>
    </PageAnimation>
  );
};

export default UserNavMenu;
