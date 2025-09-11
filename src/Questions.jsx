import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

function QuestionBox({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-2 border-black shadow-[4px_4px_0px_black] bg-white mb-4 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-[5px_5px_0px_black]">
      {/* Header */}
      <button
        className="w-full flex justify-between items-center p-3 sm:p-4 font-bold text-sm sm:text-lg text-left hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        <span className="pr-2 leading-tight">{question}</span>
        <span className="bg-yellow-400 border-2 border-black rounded-full p-1 flex-shrink-0 transition-transform duration-300 ease-in-out hover:scale-110">
          <div className={`transition-transform duration-300 ease-in-out ${open ? 'rotate-0' : 'rotate-0'}`}>
            {open ? <ChevronDown size={16} className="sm:w-5 sm:h-5" /> : <ChevronRight size={16} className="sm:w-5 sm:h-5" />}
          </div>
        </span>
      </button>

      {/* Dropdown with smooth animation */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-3 sm:p-4 pt-0 text-gray-600 font-medium text-xs sm:text-sm md:text-base leading-relaxed border-t border-gray-200">
          {answer}
        </div>
      </div>
    </div>
  );
}

export default function Questions() {
const faqs = [
  {
    q: "CAN I JOIN LIVE CLASSES ANYTIME?",
    a: "Yes! You can join scheduled live classes or watch the recorded sessions at your convenience."
  },
  {
    q: "DO I NEED SPECIAL SOFTWARE?",
    a: "No! Everything runs directly in your browser, so you don’t need to download or install anything."
  },
  {
    q: "IS THERE A FREE TRIAL?",
    a: "Yes! Students can try our platform free for 7 days and explore all the lessons and features."
  },
  {
    q: "CAN I ACCESS RECORDINGS AFTER CLASS?",
    a: "Absolutely! All recorded lessons are available anytime, so you can review at your own pace."
  },
  {
    q: "HOW MANY COURSES CAN I ENROLL IN?",
    a: "You can enroll in multiple courses at no extra cost and switch between them easily."
  },
  {
    q: "CAN PARENTS TRACK MY PROGRESS?",
    a: "Yes, parents can see reports and track learning progress through the dashboard."
  },
  {
    q: "ARE THE LESSONS MOBILE-FRIENDLY?",
    a: "Yes! Lessons work perfectly on mobile, tablet, and desktop for learning on the go."
  },
  {
    q: "DO YOU PROVIDE CERTIFICATES?",
    a: "Yes, students receive certificates automatically after completing courses and quizzes."
  }
];

  return (
    <section className="text-center pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Heading */}
      <div className="max-w-4xl mx-auto pb-8 sm:pb-12 lg:pb-16">
        <div className="inline-block px-3 py-2 mb-4 sm:mb-6 bg-[#F8D6B3] border-2 border-black shadow-[3px_3px_0px_black] sm:shadow-[4px_4px_0px_black] font-bold text-xs sm:text-sm tracking-wider">
          FAQ
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight max-w-3xl mx-auto mb-4 sm:mb-6 text-black">
          COMMON QUESTIONS <br />
          <span>ANSWERED CLEARLY</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-semibold max-w-xl mx-auto leading-relaxed">
          Here are clear answers to the most common questions we 
          get from creators, coaches and teams using the platform.
        </p>
      </div>

      {/* FAQ Container */}
      <div className="max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-4">
        {faqs.map((f, i) => (
          <QuestionBox key={i} question={f.q} answer={f.a} />
        ))}
      </div>
    </section>
  );
}