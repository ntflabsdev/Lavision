import React from 'react';
import { formatDate, getStatusColor } from './utils';

interface Subscription {
  _id: string;
  planId: string;
  planName: string;
  status: string;
  paypalSubscriptionId?: string;
  startDate: string;
  endDate?: string;
}

interface SubscriptionsTabProps {
  subscriptions: Subscription[];
  onCancelSubscription: (paypalSubscriptionId?: string) => void;
  isCancellingId: string | null;
}

const SubscriptionsTab: React.FC<SubscriptionsTabProps> = ({ 
  subscriptions, 
  onCancelSubscription, 
  isCancellingId 
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Your Subscriptions</h3>
      {subscriptions.length === 0 ? (
        <p className="text-gray-300">No subscriptions found.</p>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="text-white font-medium">{subscription.planName}</h4>
                  <p className="text-gray-300 text-sm">Started: {formatDate(subscription.startDate)}</p>
                  {subscription.endDate && (
                    <p className="text-gray-300 text-sm">Ends: {formatDate(subscription.endDate)}</p>
                  )}
                  {subscription.paypalSubscriptionId && (
                    <p className="text-gray-400 text-xs mt-1">ID: {subscription.paypalSubscriptionId}</p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                  {subscription.status === 'active' && (
                    <button
                      type="button"
                      onClick={() => onCancelSubscription(subscription.paypalSubscriptionId)}
                      className="text-xs px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isCancellingId === subscription.paypalSubscriptionId}
                    >
                      {isCancellingId === subscription.paypalSubscriptionId ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTab;
