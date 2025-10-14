import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Map, DollarSign, Brain } from '../../utls/imagepath';
import PricingCard from '../card/PricingCard';
import { useState } from 'react';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const plans = [
  {
    name: 'Explorer (Free Plan)',
    subtitle: '',
    price: 'Free',
    icon: <LazyLoadImage effect="blur" src={Map} alt="Map" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'One static 3D home scene',
      'Partial life vision questionnaire',
      'No mirror mode or customization',
      'A simple preview of what\'s possible'
    ],
    buttonText: 'Start Exploring',
    planType: 'free' as const,
    planId: 'free-plan',
  },
  {
    name: 'Legend (VIP Plan)',
    subtitle: '',
    price: '$34.99/month',
    icon: <LazyLoadImage effect="blur" src={DollarSign} alt="Dollar" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'All features unlocked',
      'Advanced Mirror Mode: body + face + emotions',
      'AI Dream Coach (daily sessions)',
      'Dream life video generation',
      'Access to private Visionaries Community',
    ],
    buttonText: 'Become a Legend',
    planType: 'paid' as const,
    priceValue: '34.99',
    planId: 'legend-plan',
  },
  {
    name: 'Visionary (Core Plan)',
    subtitle: '',
    price: '$14.99/month',
    icon: <LazyLoadImage effect="blur" src={Brain} alt="Brain" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'Full 3D interactive scene',
      'Customize house, parking, environment',
      'Mirror Mode: see your dream body',
      'Add 1 car + future partner',
      'Great entry point for serious users'
    ],
    buttonText: 'Start My Vision',
    planType: 'paid' as const,
    priceValue: '14.99',
    planId: 'visionary-plan',
  }
];

const PricingHero = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sliderRef] = useKeenSlider({
    loop: false,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
      origin: "center"
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 1.5, spacing: 20 }
      },
      "(min-width: 768px)": {
        disabled: true
      },
    },
  });

  return (
    <section
      className="min-h-screen items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 flex flex-col"
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20">
        <div className="text-center">
          <p className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dream Plan</span>
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-[#CACACA] max-w-3xl mx-auto mb-2">
            Start free and upgrade as your dreams grow
          </p>
          <p className="text-base sm:text-lg text-[#CACACA] max-w-2xl mx-auto">
            Every plan includes our core manifestation technology
          </p>
        </div>
      </div>

      <section className="py-12 sm:py-16 md:py-20 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">

          <div className="md:hidden">
            <div ref={sliderRef} className="keen-slider pb-4">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="keen-slider__slide flex justify-center"
                  onClick={() => setSelectedIndex(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <PricingCard
                    name={plan.name}
                    price={plan.price}
                    icon={plan.icon}
                    features={plan.features}
                    buttonText={plan.buttonText} 
                    planType={plan.planType}
                    priceValue={plan.priceValue}
                    planId={plan.planId} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-3">
              {plans.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${selectedIndex === index ? 'bg-purple-400 scale-110' : 'bg-gray-600'
                    }`}
                  onClick={() => setSelectedIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:justify-center md:gap-6 lg:gap-8 relative">
            {plans.map((plan, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
                className={`transition-all duration-300 ease-in-out relative ${index === 1
                    ? 'md:-translate-y-8 lg:-translate-y-12 md:z-10'
                    : 'md:translate-y-4 lg:translate-y-6'
                  } ${selectedIndex === index || hoveredIndex === index
                    ? 'transform scale-105 z-20'
                    : ''
                  }`}
              >
                <PricingCard
                  name={plan.name}
                  price={plan.price}
                  icon={plan.icon}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  planType={plan.planType}
                  priceValue={plan.priceValue}
                  planId={plan.planId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default PricingHero;
