import { useState, useEffect } from "react";
import Row2 from "../assets/n.jpg";
import Row3 from "../assets/Photo.svg";
import Row4 from "../assets/a.jpg";

export default function Tagline() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-center pt-12  sm:pt-16 lg:pt-20 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto pb-10">
        <div
          className={`inline-block px-2 sm:px-3 py-2 mb-4 sm:mb-6 bg-[#F8D6B3] border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] font-bold text-xs sm:text-sm tracking-wider transition-all duration-700 ease-out ${
            isLoaded
              ? "transform translate-y-0 opacity-100 scale-100"
              : "transform -translate-y-4 opacity-0 scale-105"
          }`}
        >
          BENEFITS
        </div>
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight max-w-3xl mx-auto mb-4 sm:mb-6 text-black transition-all duration-1000 ease-out delay-100 ${
            isLoaded
              ? "transform translate-y-0 opacity-100 scale-100"
              : "transform translate-y-6 opacity-0 scale-105"
          }`}
        >
          UPSKILL. GROW. SUCCEED.
        </h2>
        <p
          className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-semibold max-w-xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-200 ${
            isLoaded
              ? "transform translate-y-0 opacity-100 scale-100"
              : "transform translate-y-4 opacity-0 scale-105"
          }`}
        >
          Join live classes or watch recorded lessons anytime! Build skills, explore new topics, and grow your confidence in a fun and engaging way.
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
      {/*firstrow*/}
        <div className=" flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 px-4 sm:px-6 md:px-30 ">
        <div className="w-full  bg-yellow-200 p-4  sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-left px-2 py-2 mb-2">
                      LIVE CLASSES WITH <br />
                      <span className="block"> EXPERT TEACHER</span>
                    </h2>
                    <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                     Interact with teachers in real-time, ask questions,  
                     <span className="block">and get instant feedback</span>
                     <span className="block">to make learning exciting and effective.</span>
                    </p>
                </div>
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_black] w-full sm:w-1/3 flex justify-center items-center overflow-hidden">
  <img
    src={Row2}
    alt="Row1"
    className="w-full h-full object-cover"
  />
</div>
            </div>
        </div>
        <div className="w-full lg:w-2/4 bg-white p-4 sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-left font-black px-2 py-2 mb-2">LEARN AT YOUR<br/>
            <span className="block"> OWN PACE</span>
            </h2>
            <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                Missed a class? No worries!<br/>
                <span className="block">Watch recorded lessons whenever you want</span>
                <span className="block">and review difficult topics until you master them.</span>
            </p>
        </div>
        </div>
        {/*secondrow*/}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 px-4 sm:px-6 md:px-30">
        <div className="w-full lg:w-2/4 bg-white p-4 sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-left font-black px-2 py-2 mb-2">CREATE AND FOLLOW <br/>
            <span className="block">LESSONS EASILY</span>
            </h2>
            <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                Organized, easy-to-follow <br/>
                <span className="block">lessons with videos, quizzes,</span>
                <span className="block">and interactive activities</span>
                <span className="block"> that make learning fun and effective.</span>
            </p>
        </div>
        <div className="w-full bg-[#DAF5F0] p-4 sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-left px-2 py-2 mb-2">
                      ALL-IN-ONE<br />
                      <span className="block"> DASHBOARD</span>
                      <span className="block">FOR STUDENTS</span>
                    </h2>
                    <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                     Access all your courses, track progress, 
                     <span className="block">and manage assignments from</span>
                     <span className="block">one convenient dashboard — no need to switch between apps.</span>
                    </p>
                </div>
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_black] p-3 sm:p-4 w-full sm:w-1/3 flex justify-center items-center">
                    <img src={Row3} alt="Row1" className="w-full h-auto" />
                </div>
            </div>
        </div>
        </div>
        {/*thirdrow*/}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-6 md:p-8 px-4 sm:px-6 md:px-30">
        <div className="w-full bg-[#FAD7AF] p-4 sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-left px-2 py-2 mb-2">
                      ENGAGING, <br />
                      <span className="block">MOBILE-FRIENDLY LESSONS</span>
                    </h2>
                    <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                     Our lessons are designed to be fun, 
                     <span className="block">smooth, and easy to navigate on</span>
                     <span className="block"> any device — desktop, tablet, or phone.</span>
                    </p>
                </div>
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_black] p-3 sm:p-4 w-full sm:w-1/3 flex justify-center items-center">
                    <img src={Row4} alt="Row1" className="w-full h-auto" />
                </div>
            </div>
        </div>
        <div className="w-full lg:w-2/4 bg-white p-4 sm:p-6 border-2 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black]">
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-left font-black px-2 py-2 mb-2">START LEARNING QUICKLY —<br/>
            <span className="block"> NO TECH STRESS</span>
            </h2>
            <p className="text-left font-semibold px-2 py-2 text-sm sm:text-base">
                Get started in days, not weeks!   <br/>
                <span className="block">No coding, no complicated tools —</span>
                <span className="block">just log in and start learning.</span>
            </p>
        </div>
        </div>
        </div>
    </section>
  );
}
