
const AboutusHero = () => {
  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 "
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >
      <div className="w-full flex justify-center">
        <div className="bg-gradient-to-r from-[#2D234A] to-[#4B2C5E] rounded-2xl shadow-xl p-8 md:p-12 max-w-3xl w-full text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            About <span className="bg-gradient-to-r from-[#C86DD7] via-[#7F66FF] to-[#5ED2F8] text-transparent bg-clip-text">LaVision</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            We use AI to transform goal-setting into a dynamic, visual, and results-driven journey helping individuals unlock potential, refine their vision, and shape their future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutusHero;