import Background from './Background';
import Navbar from './Navbar';
import Hero from './Hero';
import Photo1 from './Photo1';
import Benefits from './Benefits';
import Box3 from './Box3';
import Testimonies from './Testimonies';
import Questions from './Questions';
import Newsletter from './Newsletter';
import Footer from './Footer';


export default function App() {
  return (
    <div className="min-h-screen relative">
      <Background />
      <Navbar />
      <Hero />
      <Photo1 />
      <Benefits />
      <Box3/>
      <Testimonies/>
      <Questions/>
      <Newsletter/>
      <Footer />
    </div>
  );
}