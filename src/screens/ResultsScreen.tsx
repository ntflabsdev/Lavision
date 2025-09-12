import DreamWorldResults from '../components/DreamWorldResults';
import TransformFuture from '../components/TransformFuture';
import Stats from '../components/Stats';

const ResultsScreen = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with DreamWorldResults */}
      <section
        className="min-h-screen flex flex-col items-center justify-center px-6 pt-20"
        style={{
          background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
        }}
      >
        <DreamWorldResults />
      </section>
      
      {/* Transform Future Section */}
      <section className="bg-white">
        <TransformFuture />
      </section>
      
      {/* Stats Section */}
      <section className="bg-black">
        <Stats />
      </section>
    </div>
  );
};

export default ResultsScreen;
