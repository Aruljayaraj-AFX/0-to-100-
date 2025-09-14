import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// TestimonialBox component
function TestimonialBox({ text, name, rating }) {
  return (
    <div className="bg-[#FFFF99] border-2 border-black shadow-[6px_6px_0px_black] p-4 sm:p-6 h-full">
      {/* Stars */}
      <div className="flex justify-center gap-1 mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-lg sm:text-xl">
            {i < rating ? "⭐" : "☆"}
          </span>
        ))}
      </div>

      {/* Text */}
      <p className="text-sm sm:text-base font-medium mb-3 sm:mb-4 text-center leading-relaxed">
        "{text}"
      </p>

      {/* Name */}
      <p className="font-bold text-center text-sm sm:text-base">{name}</p>
    </div>
  );
}

export default function Testimonials() {
  const testimonials = [
    {
      text: "I launched my first course in less than a week thanks to the platform. It saved me time and made everything super easy.",
      name: "Maria Rossi",
      rating: 5,
    },
    {
      text: "Managing team training is now smooth and fully automated. I don't need to chase anyone or worry about updates.",
      name: "Kevin Moretti",
      rating: 5,
    },
    {
      text: "I created a full academy for my students without needing a developer. It was fast, simple and looks professional.",
      name: "Elena Bianchi",
      rating: 5,
    },
    {
      text: "I can finally focus on teaching instead of wasting hours on tech problems. Everything just works as it should.",
      name: "Laura Conti",
      rating: 5,
    },
    {
      text: "I track student progress in real time and know exactly where they need help. It completely changed how I teach.",
      name: "Marco Ferrari",
      rating: 3,
    },
  ];

  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Calculate items per view based on screen size
  useEffect(() => {
    const calculateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) return 3; // lg and above
      if (width >= 640) return 2;  // sm to lg
      return 1; // below sm
    };

    const handleResize = () => {
      setItemsPerView(calculateItemsPerView());
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  // Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, itemsPerView]);

  const handleNext = () => {
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handlePrev = () => {
    const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    if (carouselRef.current) {
      const containerWidth = carouselRef.current.offsetWidth;
      const itemWidth = containerWidth / itemsPerView;
      carouselRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  // Reset index if it exceeds new maxIndex after resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
      scrollToIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  

  return (
    <section id="testimonials" className="text-center pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Heading */}
      <div  className="max-w-4xl mx-auto pb-12 sm:pb-16 lg:pb-20">
        <div className="inline-block px-3 py-2 mb-4 sm:mb-6 bg-[#F8D6B3] border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] font-bold text-xs sm:text-sm tracking-wider">
          TESTIMONIALS
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight max-w-3xl mx-auto mb-4 sm:mb-6 text-black">
          REAL STORIES,  <br />
          <span>REAL SUCCESS</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-semibold max-w-xl mx-auto leading-relaxed">
          Find clear answers to the questions students, parents, and teachers ask most about our courses, live classes, and learning platform
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        <div
          ref={carouselRef}
          className="flex overflow-hidden"
          style={{ scrollBehavior: "smooth" }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-2 sm:px-3 lg:px-4 ${
                itemsPerView === 1 ? 'w-full' :
                itemsPerView === 2 ? 'w-1/2' : 'w-1/3'
              }`}
            >
              <TestimonialBox {...testimonial} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {maxIndex > 0 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20  
              hover:bg-white/90 p-2 sm:p-3 rounded-full shadow-[0px_0px_1px_black] 
              hover:shadow-[1px_1px_0px_black] transition-all z-10 flex items-center justify-center"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20  
              hover:bg-white/90  p-2 sm:p-3 rounded-full shadow-[0px_0px_1px_black] 
              hover:shadow-[1px_1px_0px_black] transition-all z-10 flex items-center justify-center"
              aria-label="Next testimonials"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {maxIndex > 0 && (
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  scrollToIndex(i);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-black transition-all ${
                  i === currentIndex
                    ? "bg-black"
                    : "bg-white hover:bg-gray-200"
                }`}
                aria-label={`Go to testimonial group ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}