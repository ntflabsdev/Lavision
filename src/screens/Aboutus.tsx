import AboutusHero from "../components/Aboutus/AboutusHero";
import Mission from "../components/Aboutus/Mission";
import Statistics from "../components/Aboutus/Statistics";
import Team from "../components/Aboutus/Team";
import Values from "../components/Aboutus/Values";


const Aboutus = () => {
  return (
    <div className="min-h-screen">
      <AboutusHero />
      <Mission />
      <Values />
      <Team />
      <Statistics />
    </div>
  );
}

export default Aboutus;