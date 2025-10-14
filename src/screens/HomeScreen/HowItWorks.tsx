import { MessageSquare, Sparkles, Eye } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      step: "Step 1",
      title: "Tell Us Your Goals",
      description: "Answer a simple questionnaire about your dreams, aspirations, and ideal lifestyle."
    },
    {
      icon: Sparkles,
      step: "Step 2", 
      title: "AI World Creation",
      description: "Watch as our AI transforms your goals into stunning 3D environments and experiences."
    },
    {
      icon: Eye,
      step: "Step 3",
      title: "Immersive Experience",
      description: "Explore and live inside your vision! Feel motivated every day by seeing your future."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Works</span>
        </h2>
        <p className="text-gray-600 text-lg mb-16">
          Three simple steps to transform your dreams into immersive 3D reality
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-slate-900 rounded-2xl p-8 text-left hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-[#E5E6FF] w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md border-4 border-solid border-white" style={{ borderWidth: '5px' }}>
                <step.icon color="#8866FF" size={40} />
              </div>
              
              <div className="text-[#7F66FF] font-semibold mb-2">{step.step}</div>
              <h3 className="text-2xl font-bold text-[#F8FAFC] mb-4">{step.title}</h3>
              <p className="text-[#94A3B8] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;