import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGetSubscriptionDetailsQuery } from '../../store/api';

const SubscriptionSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(true);
  const [message, setMessage] = useState('Processing your subscription...');

  const subscriptionId = searchParams.get('subscription_id');

  // Use RTK Query to get subscription details
  const {
    data: subscriptionData,
    error: subscriptionError,
    isLoading: isLoadingSubscription,
  } = useGetSubscriptionDetailsQuery(subscriptionId!, {
    skip: !subscriptionId,
    pollingInterval: 5000, // Poll every 5 seconds until status is updated
  });

  useEffect(() => {
    const processSubscription = async () => {
      try {
        if (!subscriptionId) {
          setMessage('Invalid subscription details. Please contact support.');
          setIsProcessing(false);
          return;
        }

        // Wait for subscription data to load
        if (isLoadingSubscription) {
          setMessage('Verifying your subscription...');
          return;
        }

        if (subscriptionError) {
          console.error('Error verifying subscription:', subscriptionError);
          setMessage('Subscription completed! Welcome to your new plan.');
          setIsProcessing(false);
          // Still redirect to Welcome Home after error
          setTimeout(() => {
            navigate('/welcome-home');
          }, 3000);
          return;
        }

        if (subscriptionData?.success) {
          if (subscriptionData.data.database?.isActive) {
            setMessage('Congratulations! Your subscription has been activated successfully.');
          } else if (subscriptionData.data.database?.status === 'PENDING') {
            setMessage('Your subscription is being processed. You will receive a confirmation email shortly.');
            // Continue polling for status updates
            return;
          } else {
            setMessage('Subscription created successfully! Activation is in progress.');
          }
        } else {
          setMessage('Subscription completed! Welcome to your new plan.');
        }

        setIsProcessing(false);

        // Redirect to Welcome Home after 3 seconds
        setTimeout(() => {
          navigate('/welcome-home');
        }, 3000);

      } catch (error) {
        console.error('Error processing subscription:', error);
        setMessage('There was an error processing your subscription. Please contact support.');
        setIsProcessing(false);
      }
    };

    processSubscription();
  }, [subscriptionId, subscriptionData, subscriptionError, isLoadingSubscription, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4" 
         style={{
           background: `linear-gradient(90deg, #05051F 16.76%, #9F5EB0 140.63%), linear-gradient(122.01deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
         }}>
      <div className="max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
          {isProcessing ? (
            <div className="mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-white mb-2">Processing Payment</h2>
              <p className="text-gray-300">{message}</p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Success!</h2>
              <p className="text-gray-300 mb-4">{message}</p>
              <p className="text-sm text-gray-400">Redirecting to dashboard in a few seconds...</p>
            </div>
          )}

          {subscriptionId && (
            <div className="bg-black/20 rounded-lg p-4 mt-4">
              <p className="text-xs text-gray-400">Subscription ID:</p>
              <p className="text-sm text-white font-mono break-all">{subscriptionId}</p>
            </div>
          )}

          {subscriptionData?.data.database && (
            <div className="bg-black/20 rounded-lg p-4 mt-4 text-left">
              <div className="text-xs text-gray-400 mb-2">Subscription Details:</div>
              <div className="text-sm text-white space-y-1">
                <p>Plan: {subscriptionData.data.database.planName}</p>
                <p>Status: <span className={`${subscriptionData.data.database.isActive ? 'text-green-400' : 'text-yellow-400'}`}>
                  {subscriptionData.data.database.status}
                </span></p>
                {subscriptionData.data.database.isInTrial && (
                  <p className="text-blue-400">Trial Period Active</p>
                )}
                {subscriptionData.data.database.paymentInfo.nextBillingTime && (
                  <p className="text-gray-300">Next billing: {new Date(subscriptionData.data.database.paymentInfo.nextBillingTime).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/welcome-home')}
            className="mt-6 w-full bg-gradient-to-r from-[#A460ED] to-[#F07DEA] hover:from-[#9855E8] hover:to-[#E86FE3] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Continue to Welcome Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;
