import React from 'react';
import { CreditCard, Calendar, FileText, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utls/utils';

interface DashboardStatsProps {
  stats: {
    activeSubscriptions: number;
    totalQuestionnaires: number;
    totalTransactions: number;
    totalSpent: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Active Subscriptions</p>
            <p className="text-2xl font-bold text-white">{stats.activeSubscriptions}</p>
          </div>
          <CreditCard className="text-purple-400" size={24} />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Total Questionnaires</p>
            <p className="text-2xl font-bold text-white">{stats.totalQuestionnaires}</p>
          </div>
          <FileText className="text-blue-400" size={24} />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Total Transactions</p>
            <p className="text-2xl font-bold text-white">{stats.totalTransactions}</p>
          </div>
          <Calendar className="text-green-400" size={24} />
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 text-sm">Total Spent</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.totalSpent)}</p>
          </div>
          <DollarSign className="text-yellow-400" size={24} />
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
