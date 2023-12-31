import Link from "next/link";
import React, { useEffect,useState } from "react";
import { IoLogoGoogle, IoLogoFacebook } from "react-icons/io";
import {auth} from "@/firebase/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  sendPasswordResetEmail
} from "firebase/auth";
import { useAuth } from "@/context/authContext";
import {useRouter} from "next/router";
import ToastMsg from "@/components/ToastMsg";
import {toast } from 'react-toastify';
import Loader from "../components/Loader";
const gProvider = new GoogleAuthProvider();
const fProvider = new FacebookAuthProvider();

const Login = () => {
  const router = useRouter();
  const {currentUser, isLoading} = useAuth();
  const [email, setEmail] = useState("")
  
  useEffect (() => {
    if(!isLoading && currentUser){
      router.push("/");
    }
  },[currentUser, isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try{
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error){
      console.log(error)
    }
  };

  const signInwithGoogle = async () => {
    try{
      await signInWithPopup(auth, gProvider)
    } catch (error){
      console.log(error)
    }
  }
  const signInwithFacebook = async () => {
    try{
      await signInWithPopup(auth, fProvider)
    } catch (error){
      console.log(error)
    }
  }

  const resetPassword = async () => {
    try{
      toast.promise(async () => {
        await sendPasswordResetEmail(auth,email)
      },{
        pending: 'Generating reset link',
        success: 'Reset email send to your registered email id',
        error: 'You may have entered wrong email id !'
      },{
        autoClose: 5000
      });
    } catch(error){
        console.log(error);
    }
  }

  return isLoading || (!isLoading && currentUser) ? <Loader /> : (
    <div className="h-[100vh] flex justify-center items-center bg-c1">
      <ToastMsg />
      <div className="flex items-center flex-col">
        <div className="text-center">
          <div className="text-4xl font-bold">Login To Your Account</div>
          <div className="mt-3 text-c3">
            connect and chat with annyone anywhere
          </div>
        </div>

        <div className="flex items-center gap-2 w-full mt-10 mb-5">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]" onClick={signInwithGoogle}>
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoGoogle size={24} />
              <span>Login with Google</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 h-14 rounded-md cursor-pointer p-[1px]" onClick={signInwithFacebook}>
            <div className="flex items-center justify-center gap-3 text-white font-semibold bg-c1 w-full h-full rounded-md">
              <IoLogoFacebook size={24} />
              <span>Login with Facebook</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <span className="w-5 h-[1px] bg-c3"></span>
          <span className="text-c3 font-semibold">OR</span>
          <span className="w-5 h-[1px] bg-c3"></span>
        </div>

        <form 
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 w-[500px] mt-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-14 bg-c5 rounded-xl outline-none border-none px-5 text-c3"
            autoComplete="off"
          />
          <div  className="text-right w-full text-c3">
            <span className="cursor-pointer" onClick={resetPassword}>Forgot Password ?</span>
          </div>

          <button className="mt-4 w-full h-14 rounded-xl outline-none text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Login to your Account
          </button>
        </form>

        <div className="flex justify-center gap-1 text-c3 mt-5">
          <span>Not a member yet?</span>
          <Link
            href="/register"
            className="font-semibold text-white underline underline-offset-2 cursor-pointer"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
