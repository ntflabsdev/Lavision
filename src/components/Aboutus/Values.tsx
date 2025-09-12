import { Lightbulb, Users, Wand2 } from 'lucide-react';

const Values = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-purple-600" />,
      title: 'Innovation First',
      description: 'We push the boundaries of what\'s possible with AI and immersive technology to create unprecedented experiences.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Human-Centered',
      description: 'Every feature we build starts with understanding human dreams, aspirations, and the psychology of achievement.'
    },
    {
      icon: <Wand2 className="w-8 h-8 text-purple-600" />,
      title: 'Accessible Magic',
      description: 'We make advanced technology feel effortless and accessible to everyone, regardless of their technical background.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-purple-600">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Values;