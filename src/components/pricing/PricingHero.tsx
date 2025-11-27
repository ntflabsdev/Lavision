import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Map, DollarSign, Brain } from '../../utls/imagepath';
import PricingCard from '../card/PricingCard';
import { useState } from 'react';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const plans = [
  {
    name: 'Starter',
    subtitle: '',
    price: '29',
    icon: <LazyLoadImage effect="blur" src={Map} alt="Map" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'Dream Home Visualization',
      '10 Guided Questions',
      'Basic Eve Companion',
      'Monthly Vision Updates',
      'Personal Goal Tracking'
    ],
    buttonText: 'Begin Journey',
    planType: 'paid' as const,
    priceValue: '29',
    planId: 'starter-plan',
  },
  {
    name: 'Vision',
    subtitle: '',
    price: '79',
    icon: <LazyLoadImage effect="blur" src={Brain} alt="Brain" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'All Starter Features',
      'Dream Office & Car Portals',
      'Advanced Eve AI Companion',
      'Weekly Vision Refinements',
      'Reflection Room Access',
      'Priority Support'
    ],
    buttonText: 'Begin Journey',
    planType: 'paid' as const,
    priceValue: '79',
    planId: 'vision-plan',
    featured: true,
  },
  {
    name: 'Master',
    subtitle: '',
    price: '199',
    icon: <LazyLoadImage effect="blur" src={DollarSign} alt="Dollar" className="w-10 h-10 sm:w-14 sm:h-14" />,
    features: [
      'All Vision Features',
      'Unlimited Portal Access',
      'Daily Vision Coaching',
      'Custom World Creation',
      'Lifetime Access'
    ],
    buttonText: 'Begin Journey',
    planType: 'paid' as const,
    priceValue: '199',
    planId: 'master-plan',
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
      className="min-h-screen overflow-hidden items-center justify-center px-4 sm:px-6 pt-8 sm:pt-10 flex flex-col"
      style={{
        background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Choose Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Journey</span>
          </p>
          <p className="text-base sm:text-lg md:text-xl text-[#CACACA] max-w-3xl mx-auto mb-6">
            Select The Plan That Aligns With Your Vision
          </p>
        </div>
      </div>

      <section className="py-6 sm:py-8 md:py-10 w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="md:hidden">
            <div ref={sliderRef} className="keen-slider pb-0">
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

            <div className="hidden md:grid md:grid-cols-3 md:gap-5 lg:gap-6 relative items-start">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    cursor: 'pointer',
                    transform: (selectedIndex === index || hoveredIndex === index)
                      ? (plan.featured ? 'scale(1.07)' : 'scale(0.96)')
                      : (plan.featured ? 'scale(1.05)' : 'scale(0.9)')
                  }}
                  className={`transition-all duration-300 ease-in-out relative ${plan.featured ? 'md:shadow-xl' : ''}`}
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
                    featured={plan.featured}
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
