import Hero from './Hero';
import PersonalizedDream from './PersonalizedDream';
import HowItWorks from './HowItWorks';
import MirrorEffect from './MirrorEffect';
import FutureFeatures from './FutureFeatures';
import TransformFuture from '../../components/TransformFuture';
import Stats from './Stats';
import AICoach from './AiCoach';

const HomeScreen = () => {
  return (
    <>
      <Hero />
      <PersonalizedDream />
      <HowItWorks />
      <MirrorEffect />
      <FutureFeatures />
      <TransformFuture />
      <Stats />
      <AICoach/>
    </>
  );
};

export default HomeScreen;
