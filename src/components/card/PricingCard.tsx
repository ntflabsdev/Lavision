import { Check } from "lucide-react";

interface PricingCardProps {
    name: string;
    price: string;
    icon: React.ReactNode;
    features: string[];
    buttonText: string;
    cardStyle?: string;
    isSelected?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    icon,
    features,
    buttonText,
    cardStyle = '',
    isSelected = false,
}) => {
    const computedCardStyle = isSelected
        ? cardStyle.replace(/border(-\[.*?\])?\s*border-[#0-9a-fA-F]{6,8}/g, '').trim() + ' border-purple-400'
        : cardStyle;
    return (
        <div
            className={`${computedCardStyle} rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative transition-all duration-200`}
            style={{
                boxShadow: '0px 8px 32px 0px #0000004D',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
            }}
        >
            <div className="mb-6 sm:mb-8">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
                    {icon}
                </div>
                <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
                    <div className="text-2xl sm:text-[28px] font-bold text-white mb-4 sm:mb-6">{price}</div>
                </div>
            </div>
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                        <Check className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0`} />
                        <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button
                    className={`mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm font-semibold text-white transition-colors duration-200 bg-gradient-to-r from-[#A460ED] to-[#F07DEA]`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PricingCard;
