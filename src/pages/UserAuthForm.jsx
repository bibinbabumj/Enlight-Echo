import InputBox from "../components/InputBox";
import googleIcon from "../assets/icons/google.png";
import { signInUP } from "../constants/index";
import { Link, Navigate } from "react-router-dom";
import { PageAnimation } from "../common/Animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { mSetUserSession } from "../common/UserSession";
import { useContext } from "react";
import { UserContext } from "../App";
import { authWithGoogle } from "../common/Firebase";

const UserAuthForm = ({ type }) => {
  let serverPath = type == "sign-in" ? "/signin" : "/signup";
  const { mUserAuth: { access_token } = { access_token: null }, mSetUserAuth } =
    useContext(UserContext);

  const mHandleSubmitForm = (event) => {
    event.preventDefault(); /// page did 't refresh
    let form = new FormData(document.getElementById("formElement"));
    let formData = {};
    formData = Object.fromEntries(form.entries());
    if (mValidation(formData)) {
      mUserAuthenication(serverPath, formData);
    }
  };

  const mValidation = ({ email, fullname, password }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (fullname) {
      if (fullname.length < 3) {
        toast.error("Full name must be at least 3 characters long");
        return false;
      }
    }

    if (!email || !emailRegex.test(email)) {
      toast.error("Invalid email");
      return false;
    }

    if (!password || !passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long"
      );
      return false;
    }

    return true;
  };

  // User authentication via server
  const mUserAuthenication = (serverPath, mUserFormData) => {
    console.log(serverPath)
    console.log(mUserFormData)
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + serverPath, mUserFormData)
      .then(({ data }) => {
        mSetUserSession("user", JSON.stringify(data));
        mSetUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  /////google Auth

  const mHandleGoogleAuth = (event) => {
    event.preventDefault();
    authWithGoogle()
      .then((user) => {
        console.log(user)
         let serverGoogleAuthPath = "/google-auth";
         let formData = {access_token:user.accessToken};
         mUserAuthenication(serverGoogleAuthPath,formData)

      })
      .catch((err) => {
        toast.error("Trouble with Google login, try again later");
        return console.log(err);
      });
  };





  return access_token ? (
    <Navigate to="/" />
  ) : (
    <PageAnimation key_value={type}>
      <section className="cover-h flex justify-center items-center">
        <Toaster />
        <form className=" w-[80%] max-w-[400px]" id="formElement">
          <h1 className=" font-poppins text-3xl capitalize text-center mb-10">
            {type == "sign-in" ? "Welcome Back" : "Join As Today"}
          </h1>
          {type != "sign-in"
            ? signInUP.map((item, index) => <InputBox key={index} {...item} />)
            : signInUP
                .filter((item) => item.pageType === 2)
                .map((item, index) => <InputBox key={index} {...item} />)}

          <button
            className="btn-dark center mb-2 py-2"
            type="submit"
            onClick={mHandleSubmitForm}
          >
            {type.replace("-", " ")}
          </button>

          <div className=" relative w-full flex items-center gap-2 my-8 opacity-20 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>OR</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
            className="btn-dark flex justify-center items-center gap-3 center py-2"
            onClick={mHandleGoogleAuth}
          >
            <img src={googleIcon} className=" w-6 p:0"></img>
            Countinue With Google
          </button>

          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" Don't have and account"}
              <Link to="/signup" className=" underline text-black text-xl ml-1">
                {" "}
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              {" Already a member"}
              <Link to="/signin" className=" underline text-black text-xl ml-1">
                {" "}
                Sign in here{" "}
              </Link>
            </p>
          )}
        </form>
      </section>
    </PageAnimation>
  );
};

export default UserAuthForm;
