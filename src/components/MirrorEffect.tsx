import { MirrorImg } from '../utls/imagepath';

const MirrorEffect = () => {
  return (
    <section className="py-20 px-6 bg-[#FEF4FF]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              The Mirror Effect
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              See the best version of yourself – your real face, your ideal body. Our revolutionary mirror technology shows you living in your dream life.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-purple-300 rounded-full mr-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-gray-600">Realistic facial mapping with your actual features</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-purple-300 rounded-full mr-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-gray-600">Visualize your ideal physique and lifestyle</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-purple-300 rounded-full mr-4 flex items-center justify-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <span className="text-gray-600">See yourself succeeding in your dream environment</span>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-[#E9E9E9] px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
              Experience The Mirror
            </button>
          </div>
          <img src={MirrorImg} alt="Mirror Effect" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
};

export default MirrorEffect;