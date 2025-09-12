import { useState } from "react";
import { Home, Heart, Settings, Zap } from "lucide-react";
import { Curve1, Curve2, Curve3 } from "../utls/imagepath";


const HandIcon = () => (
  <img src="/src/assets/note.png" alt="Hand Icon" className="w-16 h-16 mx-auto" />
);

const galleryCards = [
  {
    key: "home",
    title: "Dream Home",
    images: [Curve1, Curve2, Curve3],
  },
  {
    key: "car",
    title: "Dream Car",
    images: [Curve2, Curve3, Curve1],
  },
  {
    key: "career",
    title: "Career Goals",
    images: [Curve3, Curve1, Curve2],
  },
];

const affirmations = [
  "I am creating a life that reflects passion, purpose, and the limitless potential within me. Each day, I move forward with clarity, confidence, and inspired action.",
  "I contribute meaningful value to the world through my actions and ideas. My work creates impact, inspires others, and leaves a lasting legacy.",
  "Confidence flows through me as I take bold steps toward my future. Every challenge strengthens my resilience and expands my potential.",
  "My creativity and vision empower me to design a life I truly love. With each step, I shape a future of limitless possibility.",
  "I attract abundance, creativity, and opportunities that align with my highest goals. With focus and discipline, I transform dreams into reality.",
];

const VisionRealizedScreen = () => {
  const [currentGallery, setCurrentGallery] = useState(1); // Start with Dream Car

  return (
    <div
      className="min-h-screen flex flex-col justify-between"
      style={{
        background:
          "linear-gradient(180deg, #05051F 0%, #1A1339 50%, #402659 100%)",
      }}
    >


      <section className="text-center py-10 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">
          Welcome to <span className="text-white">Your Vision Realized</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Step into your dream world, a space thoughtfully crafted from your unique vision. Designed with a serene countryside ambiance, it offers the perfect balance of tranquility and inspiration. Every detail is tailored to create a personal connection, transforming your environment into a meaningful reflection of who you are and the future you aspire to build.
        </p>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition">Enter 3D Mode</button>
      </section>

      {/* Gallery Section */}
      <section className="flex flex-col items-center justify-center py-8">
        <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto">
          {galleryCards.map((card, idx) => (
            <div
              key={card.key}
              className={`bg-gradient-to-br from-purple-900/60 to-purple-700/40 rounded-2xl shadow-lg flex-1 p-6 flex flex-col items-center transition-all duration-300 ${currentGallery === idx ? "scale-105" : "scale-100"}`}
              style={{ minWidth: 0 }}
            >
              <h2 className="text-xl font-bold text-white mb-4">{card.title}</h2>
              <div className="flex gap-2">
                {card.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={card.title + " " + (i + 1)}
                    className="w-20 h-16 object-cover rounded-lg border border-white/20"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Gallery Navigation Icons */}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-8 bg-black/30 rounded-xl px-8 py-4">
            <button onClick={() => setCurrentGallery(0)} className={`transition ${currentGallery === 0 ? "text-purple-400" : "text-white"}`}><Home className="w-7 h-7" /></button>
            <button onClick={() => setCurrentGallery(1)} className={`transition ${currentGallery === 1 ? "text-cyan-400" : "text-white"}`}><Heart className="w-7 h-7" /></button>
            <button onClick={() => setCurrentGallery(2)} className={`transition ${currentGallery === 2 ? "text-emerald-400" : "text-white"}`}><Settings className="w-7 h-7" /></button>
            <button className="text-white"><Zap className="w-7 h-7" /></button>
          </div>
          <HandIcon />
        </div>
      </section>

      {/* Affirmations Section */}
      <section className="py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-transparent bg-clip-text">Affirmations</h2>
        <p className="text-center text-gray-300 mb-8">Affirmations that build confidence and resilience</p>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-6 justify-center items-center">
          {affirmations.map((text, idx) => (
            <div key={idx} className="bg-white/10 text-white rounded-xl shadow-lg p-6 max-w-xl w-full text-center text-base font-medium">
              {text}
            </div>
          ))}
        </div>
        {/* Illustrations (using note.png as placeholder) */}
        <div className="flex justify-between mt-8">
          <img src="/src/assets/note.png" alt="Affirmation Illustration" className="w-24 h-24" />
          <img src="/src/assets/note.png" alt="Affirmation Illustration" className="w-24 h-24" />
        </div>
      </section>

  // ...existing code...
    </div>
  );
};

export default VisionRealizedScreen;
