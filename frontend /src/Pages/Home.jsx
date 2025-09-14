import Hero from "../components/Hero";
import Background from "../components/Background";
import Benefits from "../components/Benefits";
import Box3 from "../components/Box3";
import Photo1 from "../components/Photo1";
import Questions from "../components/Questions";
import Testimonies from "../components/Testimonies";
import Newsletter from "../components/Newsletter";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <Hero />
      <Photo1 />
      <Benefits />
      <Box3/>
      <Testimonies/>
      <Questions/>
      <Newsletter/>
    </div>
  );
}