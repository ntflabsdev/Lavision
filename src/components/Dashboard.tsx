import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, FileText, Calendar, DollarSign } from 'lucide-react';
import { useCancelPaymentSubscriptionMutation, useGetDashboardQuery } from '../store/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'subscriptions' | 'transactions' | 'questionnaires'>('overview');
  const [isCancellingId, setIsCancellingId] = useState<string | null>(null);

  const handleViewQuestionnaireDetails = (questionnaire: any) => {
    if (questionnaire.isCompleted) {
      navigate('/vision-realized');
    } else {
      navigate('/questionnaire');
    }
  };
  const [cancelPaymentSubscription] = useCancelPaymentSubscriptionMutation();

  const token = localStorage.getItem('token');
    const { 
    data: dashboardResponse, 
    isLoading, 
    error: queryError,
    refetch 
  } = useGetDashboardQuery(undefined, {
    skip: !token,
  });

  const dashboardData = dashboardResponse?.data;
  const error = queryError ? 'Failed to load dashboard data' : '';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
      case 'expired':
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCancelSubscription = async (paypalSubscriptionId?: string) => {
    if (!paypalSubscriptionId) {
      alert('Missing subscription ID');
      return;
    }
    const confirm = window.confirm('Cancel this subscription?');
    if (!confirm) return;
    try {
      setIsCancellingId(paypalSubscriptionId);
      await cancelPaymentSubscription({ subscriptionId: paypalSubscriptionId, reason: 'User dashboard cancellation' }).unwrap();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B10] via-[#1A1339] to-[#402659] pt-32 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, {dashboardData.user.firstName || 'User'}!
              </h1>
              <p className="text-gray-300">
                Member since {formatDate(dashboardData.user.createdAt)}
              </p>
            </div>
            {/* Logout button removed. Implement your own logout logic if needed. */}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Active Subscriptions</p>
                <p className="text-2xl font-bold text-white">{dashboardData.stats.activeSubscriptions}</p>
              </div>
              <CreditCard className="text-purple-400" size={24} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Questionnaires</p>
                <p className="text-2xl font-bold text-white">{dashboardData.stats.totalQuestionnaires}</p>
              </div>
              <FileText className="text-blue-400" size={24} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold text-white">{dashboardData.stats.totalTransactions}</p>
              </div>
              <Calendar className="text-green-400" size={24} />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(dashboardData.stats.totalSpent)}</p>
              </div>
              <DollarSign className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
          <div className="flex space-x-4 mb-6 border-b border-white/20">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'subscriptions', label: 'Subscriptions' },
              { key: 'transactions', label: 'Transactions' },
              { key: 'questionnaires', label: 'Questionnaires' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Email</p>
                    <p className="text-white">{dashboardData.user.email}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">Email Verified</p>
                    <p className="text-white">
                      {dashboardData.user.isEmailVerified ? '✅ Verified' : '❌ Not Verified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscriptions' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Your Subscriptions</h3>
              {dashboardData.subscriptions.length === 0 ? (
                <p className="text-gray-300">No subscriptions found.</p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.subscriptions.map((subscription, index) => (
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
                              onClick={() => handleCancelSubscription(subscription.paypalSubscriptionId)}
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
          )}

          {activeTab === 'transactions' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
              {dashboardData.transactions.length === 0 ? (
                <p className="text-gray-300">No transactions found.</p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.transactions.map((transaction, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">
                            {formatCurrency(transaction.amount, transaction.currency)}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            Transaction ID: {transaction.transactionId}
                          </p>
                          <p className="text-gray-300 text-sm">
                            Date: {formatDate(transaction.createdAt)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'questionnaires' && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Your Questionnaires</h3>
              {dashboardData.questionnaires.length === 0 ? (
                <p className="text-gray-300">No questionnaires completed yet.</p>
              ) : (
                <div className="space-y-4">
                  {dashboardData.questionnaires.map((questionnaire) => (
                    <div key={questionnaire._id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">Questionnaire</h4>
                          <p className="text-gray-300 text-sm">
                            Completed: {formatDate(questionnaire.createdAt)}
                          </p>
                          <p className="text-gray-300 text-sm">
                            Responses: {Object.keys(questionnaire.answers || {}).length} questions answered
                          </p>
                          <p className="text-gray-300 text-sm">
                            Status: {questionnaire.isCompleted ? 'Completed' : `In Progress (Step ${questionnaire.currentStep || 1})`}
                          </p>
                        </div>
                        <button 
                          onClick={() => handleViewQuestionnaireDetails(questionnaire)}
                          className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
