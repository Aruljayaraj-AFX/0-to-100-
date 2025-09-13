import Background from "../components/Background";
import usericon from "../assets/usericon.png";
import passopen from "../assets/passopen.png";
import passclose from "../assets/passclose.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="min-h-screen relative flex justify-center items-center p-2 xs:p-3 sm:p-4 sl:p-5 md:p-6">
      <Background />

      {/* Login Box */}
      <div className="border-2 shadow-[6px_6px_0px_0px] border-black w-full max-w-[280px] xs:max-w-[300px] sm:max-w-[340px] sl:max-w-[380px] md:max-w-md mx-auto p-3 xs:p-4 sm:p-5 sl:p-6 md:p-8 flex flex-col bg-[#F8D6B3]/20 items-center gap-3 xs:gap-4 sm:gap-5 sl:gap-5 md:gap-6">
        <h1 className="text-lg xs:text-xl sm:text-xl sl:text-2xl md:text-2xl font-bold">LOGIN</h1>
        
        {/* Username Input */}
        <div className="flex w-full">
          <button className="bg-black text-white px-2 xs:px-2 sm:px-3 sl:px-3 md:px-3 py-2 xs:py-2 sm:py-3 sl:py-3 md:py-3 border-2 border-black rounded-l-full hover:bg-gray-800">
            <img src={usericon} alt="User Icon" className="h-3 w-3 xs:h-4 xs:w-4 sm:h-4 sm:w-4 sl:h-5 sl:w-5 md:h-5 md:w-5" />
          </button>
          <input
            type="text"
            placeholder="Username"
            className="flex-1 px-2 xs:px-3 sm:px-3 sl:px-4 md:px-4 py-2 xs:py-2 sm:py-3 sl:py-3 md:py-3 border-2 border-black text-xs xs:text-sm sm:text-sm sl:text-base md:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Password Input */}
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="bg-black text-white px-2 xs:px-2 sm:px-3 sl:px-3 md:px-3 py-2 xs:py-2 sm:py-3 sl:py-3 md:py-3 border-2 border-black rounded-l-full hover:bg-gray-800"
          >
            <img
              src={isPasswordVisible ? passopen : passclose}
              alt="Toggle Password"
              className="h-3 w-3 xs:h-4 xs:w-4 sm:h-4 sm:w-4 sl:h-5 sl:w-5 md:h-5 md:w-5"
            />
          </button>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="flex-1 px-2 xs:px-3 sm:px-3 sl:px-4 md:px-4 py-2 xs:py-2 sm:py-3 sl:py-3 md:py-3 border-2 border-black text-xs xs:text-sm sm:text-sm sl:text-base md:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end w-full text-gray-400 -mt-2 xs:-mt-2 sm:-mt-3 sl:-mt-3 md:-mt-4 text-xs xs:text-xs sm:text-sm sl:text-sm md:text-sm cursor-pointer hover:text-red-400">
          <Link to="/forgot">Forgot password?</Link>
        </div>

        {/* Login Button */}
        <div className="flex justify-center w-full pt-2 ">
          <button className="w-full xs:w-full sm:w-full sl:w-auto md:w-auto px-6 xs:px-7 sm:px-8 sl:px-9 md:px-10 py-2 bg-yellow-400 font-semibold text-black xs:text-base sm:text-base sl:text-lg md:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            LOGIN
          </button>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center w-full">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="mx-3 xs:mx-3 sm:mx-4 sl:mx-4 md:mx-4 text-gray-800 font-medium text-xs xs:text-sm sm:text-sm sl:text-base md:text-base">or</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex gap-2 xs:gap-3 sm:gap-3 sl:gap-4 md:gap-4">
          <button className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 sl:w-9 sl:h-9 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold text-xs xs:text-sm sm:text-sm sl:text-base md:text-base">@</span>
          </button>
          <button className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 sl:w-9 sl:h-9 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold text-xs xs:text-sm sm:text-sm sl:text-base md:text-base">☏</span>
          </button>
          <button className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 sl:w-9 sl:h-9 md:w-10 md:h-10 bg-yellow-400 rounded-full flex items-center justify-center
            shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
            transition-all duration-200">
            <span className="text-black font-bold text-xs xs:text-sm sm:text-sm sl:text-base md:text-base">△</span>
          </button>
        </div>

        {/* Signup Link */}
        <div className="w-full text-left text-xs xs:text-xs sm:text-xs sl:text-sm md:text-sm text-gray-600 mt-1 xs:mt-2 sm:mt-2 sl:mt-3 md:mt-4 cursor-pointer hover:text-blue-400">
          <Link to="/signup">Signup? Create New Account</Link>
        </div>
      </div>
    </div>
  );
}