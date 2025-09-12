import PricingHero from '../components/pricing/PricingHero';
import FAQ from '../components/pricing/FAQ';
import PricingCTA from '../components/pricing/PricingCTA';

const PricingPage = () => {
  return (
    <div className="min-h-screen">
      <PricingHero />
      <FAQ />
      <PricingCTA />
    </div>
  );
};

export default PricingPage;