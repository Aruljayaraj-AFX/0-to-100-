import Row22 from '../assets/b.jpg';
import Row3 from '../assets/c.jpg';
import Row21 from '../assets/Row2.jpg';
import Arrow from '../assets/Arrow.png';
import Arrow2 from '../assets/Arrow2.png';

// Reusable InfoBox component
function InfoBox({ title, subtitle, description, imageSrc, reverse = false, arrowSrc }) {
  return (
    <>
      <div
        className={`flex flex-col lg:flex-row pt-6 lg:pt-8 px-4 sm:px-8 lg:px-26 gap-6 lg:gap-0 ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}
      >
        {/* Text Section */}
        <div className="flex-1 lg:pl-12 pt-6 lg:pt-18 text-center lg:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black px-2 py-4 mb-2">
            {title} <br />
            <span className="block">{subtitle}</span>
          </h2>
          <p className="font-semibold px-2 py-2 text-sm sm:text-base">
            {description.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center lg:justify-start">
          <div className="bg-[#DAF5F0] w-full max-w-[400px] sm:max-w-[400px] lg:w-[60%] lg:max-w-[1000px] lg:h-[400px] h-[200px] sm:h-[250px] flex items-center justify-center border-4 border-black shadow-[6px_6px_0px_black] sm:shadow-[8px_8px_0px_black] mx-auto lg:mx-0 overflow-hidden hover:scale-105 transition-transform duration-300">
            <img
              src={imageSrc}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </div>
        </div>
      </div>

      {/* Optional Arrow */}
      {arrowSrc && (
        <div className="flex justify-center items-center">
          <img src={arrowSrc} alt="Arrow" className="w-32 sm:w-40 lg:w-50 h-auto pt-6 lg:pt-10" />
        </div>
      )}
    </>
  );
}

// Main Box component
export default function Box() {
  return (
    <section className="bg-[#FAD7AF] pt-10 border-t-4 border-b-4 pb-26 mt-16">
      {/* First Box */}
      <InfoBox
        title="PRE-EXAM ANALYSIS"
        subtitle="— KNOW WHERE YOU STAND"
        description={`Take a quick pre-exam test to see what you already know.\nIdentify strengths, spot areas to improve, and get a clear picture of your learning journey before the actual exam.`}
        imageSrc={Row22}
        arrowSrc={Arrow}
      />

      {/* Second Box */}
      <InfoBox
        title="COURSES & TUTORIALS"
        subtitle="LEARN WITH EASE"
        description={`Explore engaging lessons, tutorials, and interactive activities designed to help students understand concepts clearly.\nLearn step-by-step, at your own pace, with both live guidance and recorded videos.`}
        imageSrc={Row3}
        reverse
        arrowSrc={Arrow2}
      />

      {/* Third Box */}
      <InfoBox
        title="POST-EXAM ANALYSIS"
        subtitle="LEARN FROM YOUR RESULTS"
        description={`After completing an exam, students can review their performance in detail. This helps them understand what they did well,\nidentify areas needing improvement, and plan their next steps effectively.\nPost-exam analysis turns every test into a learning opportunity.`}
        imageSrc={Row21}
      />
    </section>
  );
}
