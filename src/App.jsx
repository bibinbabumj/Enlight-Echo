// import { as Router } from "express"

import { Navmenu } from "./components";
// import {BrowserRouter as Router,Routes, Route} from ""
import { Routes, Route } from "react-router-dom";
import UserAuthForm from "./pages/UserAuthForm";
import { createContext, useEffect, useState } from "react";
import { mGetUserSession } from "./common/UserSession";
import BlogEditorPage from "./pages/BlogEditorPage";
import HomePage from "./pages/HomePage";

//global context

export const UserContext = createContext({});



const App = () => {
  const [mUserAuth, mSetUserAuth] = useState();

  useEffect(() => {
    let mUserAuthSession = mGetUserSession("user");
    mSetUserAuth(mUserAuthSession?JSON.parse(mUserAuthSession):{access_token:null})
  },[]);


  return (
    <UserContext.Provider value={{ mUserAuth, mSetUserAuth }}>
      <Routes>
        <Route path="/editor" element={<BlogEditorPage/>}/>
        <Route path="/" element={<Navmenu />}>
          <Route index element={<HomePage/>}/>
          <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="/signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
