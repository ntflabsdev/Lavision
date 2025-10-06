import { Check } from "lucide-react";
import { useState, useEffect } from "react";
// import { useAuth } from "../../contexts/AuthContext";
// TODO: Replace with RTK Query hooks for authentication
import AuthModal from "../auth/AuthModal";
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
}

const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    icon,
    features,
    buttonText,
    planType = 'free',
    planId,
}) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
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
            setShowAuthModal(true);
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
            console.log('Subscription approved:', data.subscriptionID);
            // Derive numeric amount from price string (e.g., "$9/mo")
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

    const handlePayPalCancel = (data: any) => {
        console.log('Payment cancelled:', data);
        setShowPayPal(false);
    };

    // Watch for authentication changes to continue with payment
    useEffect(() => {
        if (isAuthenticated && pendingPayment) {
            setShowAuthModal(false);
            handlePaidPlan();
            setPendingPayment(false);
        }
    }, [isAuthenticated, pendingPayment]);

    return (
        <>
            <div
                className="h-[580px] w-[320px] rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative transition-all duration-200 flex flex-col"
                style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0px 8px 32px 0px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                }}
            >
            {/* Header Section */}
            <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    {icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{name}</h3>
                <div className="text-2xl sm:text-[28px] font-bold text-white mb-4">{price}</div>
            </div>
            
            {/* Features Section - Flexible height */}
            <div className="flex-1 mb-6">
                <div className="space-y-3 h-full">
                    {features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start">
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 mt-0.5 flex-shrink-0 text-green-400" />
                            <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Button Section - Fixed height */}
            <div className="h-[80px] flex flex-col justify-center">
                {planType === 'free' ? (
                    <button
                        className="w-full h-12 px-6 rounded-full text-sm font-semibold text-white transition-colors duration-200 bg-gradient-to-r from-[#A460ED] to-[#F07DEA] hover:from-[#9855E8] hover:to-[#E86FE3] flex items-center justify-center"
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
                        className="w-full h-12 px-6 rounded-full text-sm font-semibold text-white transition-colors duration-200 bg-gradient-to-r from-[#A460ED] to-[#F07DEA] hover:from-[#9855E8] hover:to-[#E86FE3] flex items-center justify-center"
                        onClick={handlePaidPlan}
                    >
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
        
        {/* Auth Modal */}
        <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode="login"
        />
        </>
    );
};

export default PricingCard;
