import React, { useState } from 'react';
import { useCancelPaymentSubscriptionMutation, useGetDashboardQuery } from '../../store/api';
import { DashboardTab } from '../../types/types';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import DashboardTabs from './DashboardTabs';
import AccountOverview from './AccountOverview';
import SubscriptionsTab from './SubscriptionsTab';
import TransactionsTab from './TransactionsTab';
import QuestionnairesTab from './QuestionnairesTab';

const DashboardScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isCancellingId, setIsCancellingId] = useState<string | null>(null);
  const [cancelPaymentSubscription] = useCancelPaymentSubscriptionMutation();

  // Check if user has a token
  const token = localStorage.getItem('token');
  
  // Use RTK Query for dashboard data - only call if token exists
  const { 
    data: dashboardResponse, 
    isLoading, 
    error: queryError,
    refetch 
  } = useGetDashboardQuery(undefined, {
    skip: !token, // Skip query if no token is available
  });

  const dashboardData = dashboardResponse?.data;
  const error = queryError ? 'Failed to load dashboard data' : '';

  const handleCancelSubscription = async (paypalSubscriptionId?: string) => {
    if (!paypalSubscriptionId) {
      alert('Missing subscription ID');
      return;
    }
    const confirm = window.confirm('Cancel this subscription?');
    if (!confirm) return;
    try {
      setIsCancellingId(paypalSubscriptionId);
      await cancelPaymentSubscription({ 
        subscriptionId: paypalSubscriptionId, 
        reason: 'User dashboard cancellation' 
      }).unwrap();
      // Refetch dashboard data to get updated state
      refetch();
      alert('Subscription cancelled');
    } catch (e) {
      console.error(e);
      alert('Failed to cancel subscription');
    } finally {
      setIsCancellingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B10] via-[#1A1339] to-[#402659] pt-32 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B10] via-[#1A1339] to-[#402659] pt-32 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0B10] via-[#1A1339] to-[#402659] pt-32 flex items-center justify-center">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AccountOverview user={dashboardData.user} />;
      case 'subscriptions':
        return (
          <SubscriptionsTab
            subscriptions={dashboardData.subscriptions}
            onCancelSubscription={handleCancelSubscription}
            isCancellingId={isCancellingId}
          />
        );
      case 'transactions':
        return <TransactionsTab transactions={dashboardData.transactions} />;
      case 'questionnaires':
        return <QuestionnairesTab questionnaires={dashboardData.questionnaires} />;
      default:
        return <AccountOverview user={dashboardData.user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B10] via-[#1A1339] to-[#402659] pt-32 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <DashboardHeader user={dashboardData.user} />

        {/* Stats Cards */}
        <DashboardStats stats={dashboardData.stats} />

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
