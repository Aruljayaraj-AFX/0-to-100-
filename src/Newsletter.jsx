import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Handle newsletter signup here
    console.log("Newsletter signup:", email);
    // Reset form or show success message
    setEmail("");
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#FFFF99] border-2 border-black shadow-[8px_8px_0px_black] p-8 sm:p-12 lg:p-16 text-center">
          {/* Newsletter Badge */}
          <div className="inline-block px-4 py-2 mb-6 sm:mb-8 bg-[#F8D6B3] border-2 border-black shadow-[3px_3px_0px_black] font-bold text-sm tracking-wider">
            NEWSLETTER
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6 sm:mb-8 text-black max-w-4xl mx-auto">
            DISCOVER OUR LATEST COURSES
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-semibold max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Be among the first to explore our latest interactive lessons, live classes, and fun learning activities designed to help students grow and succeed.
          </p>

          {/* Email Input */}
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-black text-base sm:text-lg font-medium placeholder-gray-500 focus:outline-none focus:ring-0 bg-white sm:rounded-l-full sm:rounded-r-none rounded-full sm:border-r-0"
              />
              <button
                onClick={handleSubmit}
                className="bg-black hover:bg-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 border-2 border-black transition-colors duration-200 flex items-center justify-center gap-2 font-semibold rounded-full sm:rounded-l-none sm:rounded-r-full"
              >
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="sm:hidden">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}