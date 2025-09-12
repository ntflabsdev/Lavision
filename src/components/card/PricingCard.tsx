import { Check } from "lucide-react";

interface PricingCardProps {
    name: string;
    price: string;
    icon: React.ReactNode;
    features: string[];
    buttonText: string;
    cardStyle?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    icon,
    features,
    buttonText,
    cardStyle = '',
}) => {
    return (
        <div className={`${cardStyle} rounded-3xl p-8 text-white relative`}>

            <div className="mb-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    {icon}
                </div>
                <div className="text-left">
                    <h3 className="text-2xl font-bold mb-2">{name}</h3>
                    <div className="text-[28px] font-bold text-white mb-6">{price}</div>
                </div>
            </div>
            <div className="space-y-4 mb-8">
                {features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-purple-400 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    className={`mt-8 px-8 py-3 rounded-full text-sm font-semibold text-white transition-colors duration-200 bg-gradient-to-r from-[#A460ED] to-[#F07DEA]`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PricingCard;
