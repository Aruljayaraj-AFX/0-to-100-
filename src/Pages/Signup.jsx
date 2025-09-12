import Background from "../components/Background";
import usericon from "../assets/usericon.png";
import passopen from "../assets/passopen.png";
import passclose from "../assets/passclose.png";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {
const [isPasswordVisible, setIsPasswordVisible] = useState(false);
const [ispasswordvisible, setispasswordvisible] = useState(false);

  return (
    <div className="min-h-screen relative flex justify-center items-center">
      <Background />

      {/* Login Box */}
      <div className="border-2 shadow-[6px_6px_0px_0px] border-black w-full max-w-md mx-4 p-8 flex flex-col bg-[#F8D6B3]/20 items-center gap-6">
        <h1 className="text-2xl font-bold">SIGNUP</h1>
        <div className="flex w-full">
          <button className="bg-black text-white px-3 py-3 border-2 border-black rounded-l-full hover:bg-gray-800">
            <img src={usericon} alt="User Icon" className="h-5 w-5" />
          </button>
          <input
            type="text"
            placeholder="Username"
            className="flex-1 px-4 py-3 border-2 border-black text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="bg-black text-white px-3 py-3 border-2 border-black rounded-l-full hover:bg-gray-800"
          >
            <img
              src={isPasswordVisible ? passopen : passclose}
              alt="Toggle Password"
              className="h-5 w-5"
            />
          </button>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="flex-1 px-4 py-3 border-2 border-black text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setispasswordvisible(!ispasswordvisible)}
            className="bg-black text-white px-3 py-3 border-2 border-black rounded-l-full hover:bg-gray-800"
          >
            <img
              src={ispasswordvisible ? passopen : passclose}
              alt="Toggle Password"
              className="h-5 w-5"
            />
          </button>
          <input
            type={ispasswordvisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="flex-1 px-4 py-3 border-2 border-black text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Login Button */}
        <div className="flex justify-center w-full pt-2 ">
          <button className="w-full sm:w-auto px-6 sm:px-10 py-2 bg-yellow-400 font-semibold text-black sm:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            SIGNUP
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-4 text-gray-800 font-medium">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-4">
          <button className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold">@</span>
          </button>
          <button className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold">☏</span>
          </button>
          <button className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold">△</span>
          </button>
        </div>

        {/* Signup */}
        <div className="w-full text-left text-xs text-gray-600 mt-4 cursor-pointer hover:text-blue-400">
          <Link to="/login">Login?Already Have Account</Link>
        </div>
      </div>
    </div>
  );
}
