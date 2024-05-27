import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Google Auth provider
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in with Google:", error);
    return null;
  }
};

// export const authWithGoogle = async () => {
//   let user=null
//   await signInWithPopup(auth,provider).then((result)=>{
//     user=result.user
//   }).catch((err=>{
//     //console.error("Error during sign-in with Google:", error);
//     console.error("Error code:", err.code);
//         console.error("Error message:", err.message);
//        console.error("Error details:", err);
//   }))
   
//   return user
// };
