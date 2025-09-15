
const ContactHero = () => {
  return (
    <section
      className="min-h-[60vh] md:min-h-[90vh] flex items-center justify-center px-6 "
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >    
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-purple-800/30 backdrop-blur-sm rounded-3xl p-12 text-center border border-purple-700/50">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Let's Make Your <span className="bg-gradient-to-r from-[#C86DD7] via-[#7F66FF] to-[#5ED2F8] text-transparent bg-clip-text">Dreams Reality</span>
          </h1>
          <p className="text-xl text-[#CACACA]">
            Have questions about LaVision? Want to share your dream manifestation story?
          </p>
          <p className="text-lg text-[#CACACA]">
            We'd love to hear from you and help you on your journey.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;