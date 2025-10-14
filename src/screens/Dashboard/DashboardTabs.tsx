import React from 'react';
import { DashboardTab } from '../../types/types';

interface DashboardTabsProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: 'overview' as const, label: 'Overview' },
    { key: 'subscriptions' as const, label: 'Subscriptions' },
    { key: 'transactions' as const, label: 'Transactions' },
    { key: 'questionnaires' as const, label: 'Questionnaires' },
  ];

  return (
    <div className="flex space-x-2 sm:space-x-4 mb-6 border-b border-white/20 overflow-x-auto flex-nowrap scrollbar-thin scrollbar-thumb-purple-500">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors min-w-max ${
            activeTab === tab.key
              ? 'bg-purple-600 text-white'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;
