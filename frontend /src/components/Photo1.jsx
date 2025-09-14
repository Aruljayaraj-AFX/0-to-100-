import { useState, useEffect, useRef } from "react";
import Photo from "../assets/Photo.svg";

export default function Photo1() {
  const introTilt = 90;       // starting angle on mount
  const initialTilt = 60;     // resting angle before scrolling
  const finalTilt = 0;      // angle after scrolling down
  const scrollRange = 600;

  const [rotateX, setRotateX] = useState(introTilt); // start from introTilt
  const targetRotateX = useRef(initialTilt);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / scrollRange, 1);
      targetRotateX.current = initialTilt + (finalTilt - initialTilt) * progress;
    };

    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      setRotateX(prev => prev + (targetRotateX.current - prev) * 0.1); 
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-8 sm:pb-12 lg:pb-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-20xl mx-auto perspective-[1000px]">
        <img
          src={Photo}
          alt="Hero"
          className="mx-auto w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-3/4 max-w-6xl mt-4 sm:mt-6 lg:mt-8 border-2 sm:border-4 shadow-[4px_4px_0px_black] sm:shadow-[6px_6px_0px_black]"
          style={{ transform: `rotateX(${rotateX}deg)` }}
        />
      </div>
    </div>
  );
}
