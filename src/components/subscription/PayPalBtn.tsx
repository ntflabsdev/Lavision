import React from 'react';

interface PayPalBtnProps {
    planId: string;
    onApprove: (data: any) => void;
    onError?: (err: any) => void;
    onCancel?: (err: any) => void;
}

const PayPalBtn: React.FC<PayPalBtnProps> = ({ 
    planId, 
    onApprove, 
    onError, 
    onCancel 
}) => {
    const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID";

    // Map frontend plan IDs to actual PayPal plan IDs
    const getPayPalPlanId = (frontendPlanId: string) => {
        switch (frontendPlanId) {
            case 'visionary-plan':
            case 'visionary':
                return 'P-9VN96637N38751438NDN4GXI'; // Visionary Plan
            case 'legend-plan':
            case 'legend':
                return 'P-31D06951VC473591BNDN4GXQ'; // Legend Plan
            default:
                console.error('Unknown plan ID:', frontendPlanId);
                return frontendPlanId; // Fallback to original
        }
    };

    const actualPayPalPlanId = getPayPalPlanId(planId);

    React.useEffect(() => {
        // Load PayPal SDK script
        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&vault=true`;
        script.setAttribute('data-sdk-integration-source', 'button-factory');
        document.head.appendChild(script);

        script.onload = () => {
            if ((window as any).paypal) {
                (window as any).paypal.Buttons({
                    style: {
                        shape: 'rect',
                        color: 'blue',
                        layout: 'horizontal',
                        label: 'subscribe',
                        tagline: false
                    },
                    createSubscription: function(_data: any, actions: any) {
                        return actions.subscription.create({
                            'plan_id': actualPayPalPlanId
                        });
                    },
                    onApprove: function(data: any) {
                        console.log('PayPal subscription approved:', data.subscriptionID);
                        onApprove(data);
                    },
                    onError: function(err: any) {
                        console.error('PayPal error:', err);
                        if (onError) onError(err);
                    },
                    onCancel: function(data: any) {
                        console.log('PayPal cancelled:', data);
                        if (onCancel) onCancel(data);
                    }
                }).render('#paypal-button-container');
            }
        };

        return () => {
            // Cleanup script when component unmounts
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, [paypalClientId, actualPayPalPlanId, onApprove, onError, onCancel]);

    return <div id="paypal-button-container"></div>;
};

export default PayPalBtn;
