import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalBtn from "../subscription/PayPalBtn.tsx";
import { 
    useAddTransactionMutation, 
    useAddUserSubscriptionMutation 
} from '../../store/api';
import { useGetUserQuery } from '../../store/hooks';

interface PricingCardProps {
    name: string;
    price: string;
    icon: React.ReactNode;
    features: string[];
    buttonText: string;
    planType?: 'free' | 'paid';
    planId?: string;
    priceValue?: string;
    featured?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    icon,
    features,
    buttonText,
    planType = 'free',
    planId,
    featured = false,
}) => {
    const navigate = useNavigate();
    const [pendingPayment, setPendingPayment] = useState(false);
    const [showPayPal, setShowPayPal] = useState(false);
    
    // Check if user has a token
    const token = localStorage.getItem('token');
    
    // Use RTK Query for authentication - only call if token exists
    const { data: userData } = useGetUserQuery(undefined, {
        skip: !token, // Skip query if no token is available
    });
    const isAuthenticated = !!userData?.data?.user && !!token;
    const [addTransaction] = useAddTransactionMutation();
    const [addUserSubscription] = useAddUserSubscriptionMutation();

    const handleFreePlan = () => {
        alert('Welcome to the free plan! You can now explore our basic features.');
        window.location.href = '/dashboard';
    };

    const handlePaidPlan = () => {
        if (!isAuthenticated) {
            setPendingPayment(true);
            navigate('/register');
            return;
        }

        if (!planId) {
            alert('Plan ID is missing. Please try again.');
            return;
        }
        setShowPayPal(true);
    };

    const handlePayPalApprove = async (data: any) => {
        try {
            const amountMatch = price.match(/\d+(?:\.\d+)?/);
            const amount = amountMatch ? parseFloat(amountMatch[0]) : 0;

            if (planId) {
                await addUserSubscription({
                    planId,
                    planName: name,
                    paypalSubscriptionId: data.subscriptionID,
                    status: 'active'
                }).unwrap();
            }

            await addTransaction({
                transactionId: `sub-${data.subscriptionID}`,
                amount,
                currency: 'USD',
                status: 'completed',
                paypalOrderId: data.subscriptionID
            }).unwrap();

            alert(`Subscription created successfully! Subscription ID: ${data.subscriptionID}`);
            window.location.href = '/subscription/success';
        } catch (err) {
            console.error('Error saving subscription/transaction:', err);
            alert('Subscription approved but saving failed. Please contact support.');
        }
    };

    const handlePayPalError = (err: any) => {
        console.error('PayPal Error:', err);
        alert('Payment failed. Please try again.');
        setShowPayPal(false);
    };

    const handlePayPalCancel = () => {
        setShowPayPal(false);
    };

    // Watch for authentication changes to continue with payment
    useEffect(() => {
        if (isAuthenticated && pendingPayment) {
            handlePaidPlan();
            setPendingPayment(false);
        }
    }, [isAuthenticated, pendingPayment]);

    return (
        <>
            <div
                className={`h-[580px] w-[340px] rounded-2xl p-8 text-white relative transition-all duration-300 flex flex-col ${
                    featured ? 'ring-2 ring-cyan-400/50' : ''
                }`}
                style={{
                    background: 'rgba(42, 31, 61, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: featured 
                        ? '0 0 40px rgba(34, 211, 238, 0.3), 0px 8px 32px 0px rgba(0,0,0,0.4)'
                        : '0px 8px 32px 0px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                }}
            >
            {/* Header Section */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">{name}</h3>
                <div className="flex items-start justify-center mb-2">
                    <span className="text-5xl font-bold text-white">$ {price}</span>
                    <span className="text-lg text-gray-400 mt-2 ml-1">/Month</span>
                </div>
            </div>
            
            {/* Features Section - Flexible height */}
            <div className="flex-1 mb-6">
                <div className="space-y-4 h-full">
                    {features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                            <Check className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-white" />
                            <span className="text-base text-white leading-relaxed">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Button Section - Fixed height */}
            <div className="h-[60px] flex flex-col justify-center">
                {planType === 'free' ? (
                    <button
                        className="w-full h-14 px-6 rounded-xl text-base font-semibold text-white transition-all duration-200 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] flex items-center justify-center"
                        onClick={handleFreePlan}
                    >
                        {buttonText}
                    </button>
                ) : showPayPal ? (
                    <div className="w-full">
                        <PayPalBtn
                            planId={planId || ''}
                            onApprove={handlePayPalApprove}
                            onError={handlePayPalError}
                            onCancel={handlePayPalCancel}
                        />
                    </div>
                ) : (
                    <button
                        className={`w-full h-14 px-6 rounded-xl text-base font-semibold text-white transition-all duration-200 flex items-center justify-center ${
                            featured 
                                ? 'bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] hover:shadow-lg hover:shadow-cyan-500/40 hover:scale-[1.02]'
                                : 'bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]'
                        }`}
                        onClick={handlePaidPlan}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
        </>
    );
};

export default PricingCard;
