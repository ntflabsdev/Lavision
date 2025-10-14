
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Team = () => {
  const teamMembers = [
    {
      name: 'Alex Stone',
      role: 'Head of AI',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Maya Rodriguez',
      role: 'CTO & Co-Founder',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Marcus Nova',
      role: 'Head of Generative AI',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      name: 'Aria Vega',
      role: 'Company Director',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section className="py-20 bg-[#FEF5FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Meet <span className="text-purple-600">Our Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering minds shaping the future of immersive experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 text-white text-center transform group-hover:scale-105 transition-transform duration-300">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-purple-200 text-lg">{member.role}</p>
                </div>
                <div className="w-full h-80 rounded-2xl overflow-hidden">
                  <LazyLoadImage
                    effect="blur"
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;