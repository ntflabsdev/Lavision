import { Misson } from '../../utls/imagepath';

const Mission = () => {
  return (
    <section className="py-20 bg-[#FEF5FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our <span className="text-purple-600">Mission</span>
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                To democratize dream manifestation by combining artificial 
                intelligence with immersive technology, enabling anyone to 
                visualize and work towards their ideal life.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We started LaVision because we saw too many people stuck in 
                unfulfilling lives, unable to clearly envision their path to 
                happiness. Our platform bridges the gap between dreams and 
                reality through personalized AI-generated experiences.
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={Misson}
              alt="Mission"
              className="w-full max-w-lg  object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;