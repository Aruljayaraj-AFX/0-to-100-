import Background from "../components/Background";
import otp from "../assets/otp.png";
import gmail from "../assets/gmail.png";
import passopen from "../assets/passopen.png";
import passclose from "../assets/passclose.png";
import { useState } from "react";


export default function Login() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [ispasswordvisible, setispasswordvisible] = useState(false);

  const [showotp, setshowotp] = useState(false);
  const [showpass, setshowpass] = useState(false);

  return (
    <div className="min-h-screen relative flex justify-center items-center p-4">
      <Background />
      {/* Signup Box */}
      <div className="border-2 shadow-[6px_6px_0px_0px] border-black w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto p-4 sm:p-6 md:p-8 flex flex-col bg-[#F8D6B3]/20 items-center gap-4 sm:gap-6">
        <h1 className="text-xl sm:text-2xl font-bold">FORGOT PAGE</h1>
        {/* Username Input */}
        { !showotp && !showpass && (
        <>
        <div className="flex w-full">
          <button className="bg-black text-white px-2 sm:px-3 py-2 sm:py-3 border-2 border-black rounded-l-full">
            <img src={gmail} alt="gmail" className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <input
            type="email"
            placeholder="abc123@gmail.com"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black text-sm sm:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        <div className="flex justify-center w-full pt-2 ">
          <button 
          onClick={() => setshowotp(true)}
          className="w-xs xs:w-full sm:w-full sl:w-auto md:w-auto px-6 xs:px-7 sm:px-8 sl:px-9 md:px-10 py-2 bg-yellow-400 font-semibold text-black xs:text-base sm:text-base sl:text-lg md:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            SEND OTP
          </button>
        </div>
        </>
        ) }
        { showotp && !showpass && (
        <>
        <div className="flex w-full">
          <button className="bg-black text-white px-2 sm:px-3 py-2 sm:py-3 border-2 border-black rounded-l-full">
            <img src={otp} alt="otp" className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <input
            type="number"
            placeholder="1234"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-black text-sm sm:text-base font-medium placeholder-gray-500 
            focus:outline-none focus:ring-0 rounded-r-full"
          />
        </div>

        <div className="flex justify-center w-full pt-2 ">
          <button
          onClick={() => { setshowpass(true); setshowotp(false); }}
          className="w-xs xs:w-full sm:w-full sl:w-auto md:w-auto px-6 xs:px-7 sm:px-8 sl:px-9 md:px-10 py-2 bg-yellow-400 font-semibold text-black xs:text-base sm:text-base sl:text-lg md:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            VERIFY OTP
          </button>
        </div>
        </>
        ) }

        {/* Password Input */}
        { showpass && (
        <>
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
            placeholder="New Password"
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

        <div className="flex justify-center w-full pt-2 ">
          <button className="w-xs xs:w-full sm:w-full sl:w-auto md:w-auto px-6 xs:px-7 sm:px-8 sl:px-9 md:px-10 py-2 bg-yellow-400 font-semibold text-black xs:text-base sm:text-base sl:text-lg md:text-lg 
            shadow-[2px_2px_0px_black] hover:translate-x-1 hover:translate-y-1
            hover:shadow-[0px_0px_0px_black] transition-all duration-100 rounded-full">
            CHANGE PASSWORD
          </button>
        </div>
        </>
        ) }

        </div>
    </div>
  );
}