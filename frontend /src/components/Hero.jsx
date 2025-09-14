// Hero.jsx 
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top (hero section) on page load/reload
    window.scrollTo(0, 0);
    
    // Trigger animation after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-center pt-24 sm:pt-32 lg:pt-40 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">

      <div className="max-w-6xl mx-auto">
        {/* Tagline */}
        <div 
          className={`inline-block px-3 sm:px-4 py-2 mb-6 sm:mb-8 bg-yellow-100 border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] font-bold text-xs sm:text-sm tracking-wider transition-all duration-700 ease-out ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100 scale-100' 
              : 'transform -translate-y-4 opacity-0 scale-105'
          }`}
        >
          ENDLESS LEARN OPPORTUNITIES
        </div>
        
        {/* Main Heading - Responsive text sizes */}
        <h1 
          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight max-w-5xl mx-auto mb-4 sm:mb-6 text-black transition-all duration-1000 ease-out delay-100 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100 scale-100' 
              : 'transform translate-y-8 opacity-0 scale-110'
          }`}
        >
          LEVEL UP YOUR SKILLS<br />
          <span className="block">LEARN WITH US</span>
        </h1>
        
        {/* Subheading - Responsive text and spacing */}
        <p 
          className={`text-sm sm:text-base md:text-lg text-gray-400 font-semibold max-w-xs sm:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2 sm:px-0 transition-all duration-1000 ease-out delay-200 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100 scale-100' 
              : 'transform translate-y-6 opacity-0 scale-105'
          }`}
        >
          Discover a fun and interactive way to build strong foundations, explore new interests, and gain real-world skills. Our courses help young learners grow in confidence and stay ahead for the future.
        </p>
        
        {/* Buttons - Responsive layout and sizing */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 transition-all duration-1000 ease-out delay-300 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100 scale-100' 
              : 'transform translate-y-8 opacity-0 scale-105'
          }`}
        >
          <Link to="/login" className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-yellow-400 font-bold text-black border-2
           text-base sm:text-lg shadow-[4px_4px_0px_black] sm:shadow-[4px_4px_0px_black] hover:translate-x-1
            hover:translate-y-1 hover:shadow-[1px_1px_0px_black] sm:hover:shadow-[1px_1px_0px_black] transition-all duration-100">
            Login
          </Link>
          <Link to="/signup" className="font-semibold flex items-center gap-2 text-black hover:text-gray-600 transition-colors text-base sm:text-lg">
            Signup →
          </Link>
        </div>
        
        {/* Guarantee - Responsive text */}
        <p 
          className={`text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-2 transition-all duration-1000 ease-out delay-400 ${
            isLoaded 
              ? 'transform translate-y-0 opacity-100' 
              : 'transform translate-y-4 opacity-0'
          }`}
        >
          <span>⏳</span> Your Success, 100% Secured!
        </p>
      </div>
    </section>
  );
}