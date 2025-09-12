import { Map, DollarSign, Brain } from '../../utls/imagepath';
import PricingCard from '../card/PricingCard';
const plans = [
  {
    name: 'Explorer (Free Plan)',
    subtitle: '',
    price: 'Free',
    icon: <img src={Map} alt="Map" className="w-14 h-14" />,
    features: [
      'One static 3D home scene',
      'Partial life vision questionnaire',
      'No mirror mode or customization',
      'A simple preview of what\'s possible'
    ],
    buttonText: 'Start Exploring',
    buttonStyle: 'bg-purple-600 hover:bg-purple-700',
    cardStyle: 'border-[1px] border-[#59595933] shadow-xl min-h-[480px]'
  },
  {
    name: 'Legend (VIP Plan)',
    subtitle: '',
    price: '$34.99/month',
    icon: <img src={DollarSign} alt="Dollar" className="w-14 h-14" />,
    features: [
      'All features unlocked',
      'Advanced Mirror Mode: body + face + emotions',
      'AI Dream Coach (daily sessions)',
      'Dream life video generation',
      'Access to private Visionaries Community',
      'Maximum personalization + accountability'
    ],
    buttonText: 'Become a Legend',
    buttonStyle: 'bg-purple-600 hover:bg-purple-700',
    cardStyle: 'border-purple-500 border-2 border-[1px] border-[#59595933] shadow-xl min-h-[660px]',
  },
  {
    name: 'Visionary (Core Plan)',
    subtitle: '',
    price: '$14.99/month',
    icon: <img src={Brain} alt="Brain" className="w-14 h-14" />,
    features: [
      'Full 3D interactive scene',
      'Customize house, parking, environment',
      'Mirror Mode: see your dream body',
      'Add 1 car + future partner',
      'Great entry point for serious users'
    ],
    buttonText: 'Start My Vision',
    buttonStyle: 'bg-purple-600 hover:bg-purple-700',
    cardStyle: 'border-gray-700 border-[1px] border-[#59595933] shadow-xl min-h-[480px]'
  }
];
const PricingHero = () => {
  return (
    <section
      className="min-h-screen items-center justify-center px-6 pt-20 flex flex-col"
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="text-center">
          <p className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dream Plan</span>
          </p>
          <p className="text-xl md:text-2xl text-[#CACACA] max-w-3xl mx-auto">
            Start free and upgrade as your dreams grow
          </p>
          <p className="text-lg text-[#CACACA] max-w-2xl mx-auto">
            Every plan includes our core manifestation technology
          </p>
        </div>
      </div>
      <section className=" py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto flex-nowrap">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                price={plan.price}
                icon={plan.icon}
                features={plan.features}
                buttonText={plan.buttonText}
                cardStyle={plan.cardStyle}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default PricingHero;