import { Shield, TrendingUp, Smartphone } from 'lucide-react';

const FutureFeatures = () => {
  const features = [
    {
      icon: Shield,
      title: "Fully Private & Customizable",
      description: "Your dreams and data stay completely private. Customize every aspect of your virtual world."
    },
    {
      icon: TrendingUp,
      title: "Upgrade Your World Anytime",
      description: "As you grow and achieve goals, evolve your dream world. Add new aspirations and watch them come to life."
    },
    {
      icon: Smartphone,
      title: "Future VR Integration",
      description: "Ready for the metaverse. Your 3D world will seamlessly work with upcoming VR and AR devices."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Your{' '}
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Future
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Privacy-first technology that grows with you and prepares for tomorrow's immersive experiences
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-900 rounded-2xl p-8 hover:transform hover:scale-105 transition-all duration-300">
             <div className="bg-[#E5E6FF] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-solid border-white" style={{ borderWidth: '5px' }}>
                <feature.icon color="#8866FF" size={40} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureFeatures;