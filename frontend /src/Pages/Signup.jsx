import Background from "../components/Background";
import usericon from "../assets/usericon.png";
import passopen from "../assets/passopen.png";
import passclose from "../assets/passclose.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [ispasswordvisible, setispasswordvisible] = useState(false);
  const [active, setActive] = useState("teacher");

  return (
    <div className="min-h-screen relative flex justify-center items-center p-4">
      <Background />
      {/* Signup Box */}
      <div className="border-2 shadow-[6px_6px_0px_0px] border-black w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto p-4 sm:p-6 md:p-8 flex flex-col bg-[#F8D6B3]/20 items-center gap-4 sm:gap-6">
        <h1 className="text-xl sm:text-2xl font-bold">SIGNUP</h1>
        
        {/* Teacher/Student Toggle - Responsive Design */}
        <div className="flex justify-center w-full max-w-xs">
          {/* Teacher Button */}
          <div className={`flex-grow text-center rounded-l-full transition-all duration-300
            ${active === "teacher" ? "bg-yellow-400" : "bg-black"}
            md:[clip-path:polygon(0%_0%,95%_0%,85%_100%,0%_100%)] md:-mr-9`}>
            <button 
              onClick={() => setActive("teacher")}
              className={`font-bold py-2 sm:py-3 w-full transition-all duration-300 text-sm sm:text-base
                ${active === "teacher" ? "text-black" : "text-white"}`}>
              Teacher
            </button>
          </div>
          
          {/* Student Button */}
          <div className={`flex-grow text-center rounded-r-full transition-all duration-300
            ${active === "student" ? "bg-yellow-400" : "bg-black"}
            md:[clip-path:polygon(15%_0%,100%_0%,100%_100%,5%_100%)]`}>
            <button 
              onClick={() => setActive("student")}
              className={`font-bold py-2 sm:py-3 w-full transition-all duration-300 text-sm sm:text-base
                ${active === "student" ? "text-black" : "text-white"}`}>
              Student
            </button>
          </div>
        </div>

        {/* Username Input */}
        <div className="flex w-full">
          <button className="bg-black text-white px-2 sm:px-3 py-2 sm:py-3 border-2 border-black rounded-l-full">
            <img src={usericon} alt="User Icon" className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <input
            type="text"
            placeholder="Username"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black text-sm sm:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Password Input */}
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="bg-black text-white px-2 sm:px-3 py-2 sm:py-3 border-2 border-black rounded-l-full hover:bg-gray-800"
          >
            <img
              src={isPasswordVisible ? passopen : passclose}
              alt="Toggle Password"
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
          </button>
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black text-sm sm:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="flex w-full">
          <button
            type="button"
            onClick={() => setispasswordvisible(!ispasswordvisible)}
            className="bg-black text-white px-2 sm:px-3 py-2 sm:py-3 border-2 border-black rounded-l-full hover:bg-gray-800"
          >
            <img
              src={ispasswordvisible ? passopen : passclose}
              alt="Toggle Password"
              className="h-4 w-4 sm:h-5 sm:w-5"
            />
          </button>
          <input
            type={ispasswordvisible ? "text" : "password"}
            placeholder="Confirm Password"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black text-sm sm:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        {/* Signup Button */}
        <div className="flex justify-center w-full pt-2 ">
          <button className="w-xs xs:w-full sm:w-full sl:w-auto md:w-auto px-6 xs:px-7 sm:px-8 sl:px-9 md:px-10 py-2 bg-yellow-400 font-semibold text-black xs:text-base sm:text-base sl:text-lg md:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            SIGNUP
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

        {/* Login Link */}
        <div className="w-full text-left text-xs xs:text-xs sm:text-xs sl:text-sm md:text-sm text-gray-600 mt-1 xs:mt-2 sm:mt-2 sl:mt-3 md:mt-4 cursor-pointer hover:text-blue-400">
          <Link to="/login">Login? Already Have Account</Link>
        </div>
      </div>
    </div>
  );
}