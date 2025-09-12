import Background from "../components/Background";
import usericon from "../assets/usericon.png";
import passopen from "../assets/passopen.png";
import passclose from "../assets/passclose.png";
import { useState } from "react";


export default function Login() {
    const [isClicked, setIsClicked] = useState(false);
    return(
        <div className="min-h-screen relative flex justify-center items-center ">
              <Background />
             <div className="border-2 shadow-[6px_6px_0px_0px] border-black w-full max-w-md p-8 flex flex-col bg-[#F8D6B3]/20 items-center gap-6">
                <h1 className="text-2xl font-bold">LOGIN</h1>
                <div className="flex w-full gap-0">
                    <button className="bg-black text-white px-3 py-3 border-2 border-black font-semibold rounded-l-full 
                    hover:bg-gray-800">
                      <img src={usericon} alt="User Icon" className="h-5 w-5 "/>
                    </button>
                    <input
                      type="text"
                      placeholder="Username"
                      className="flex-1 px-4 py-3 border-2 border-black text-base font-medium placeholder-gray-500 
                      focus:outline-none focus:ring-0 rounded-r-full"/>
                </div>
                <div className="flex w-full gap-0">
                    <button 
                    type="button"
                    className="bg-black text-white px-3 py-3 border-2 border-black font-semibold rounded-l-full 
                    hover:bg-gray-800">
                      <img src={isClicked?passopen:passclose} onClick={() => setIsClicked(!isClicked)} 
                      alt="passclose" className="h-5 w-5 "/>
                    </button>
                    <input
                      type={isClicked?"text":"password"}
                      placeholder="Password"
                      className="flex-1 px-4 py-3 border-2 border-black text-base font-medium placeholder-gray-500 
                      focus:outline-none focus:ring-0 rounded-r-full"/>
                    
                </div>
                <div className="flex justify-center w-full gap-0 border-b-2 border-gray-500 pt-2 pb-8">
                    <button className="bg-yellow-400 text-black px-3 py-2  shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                     border-black font-semibold w-[100px] rounded-full ">LOGIN
                    </button>
                </div>
                <div className="flex lg:gap-4  sm:gap-3 order-2 lg:order-3">
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center
               shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] 
              transition-all duration-200">
                <span className="text-black font-bold text-sm sm:text-base">☏</span>
              </button>
              <button className="w-8 h-8  sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] transition-all duration-200">
                <span className="text-black font-bold text-sm sm:text-base">@</span>
              </button>
              <button className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded-full flex items-center justify-center shadow-[2px_2px_0px_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_black] transition-all duration-200">
                <span className="text-black font-bold text-sm sm:text-base">△</span>
              </button>
            </div>
            </div>
        </div>
        
    );
}
