export type DashboardTab = 'overview' | 'subscriptions' | 'transactions' | 'questionnaires';

export interface DashboardProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
}

export interface FormatUtils {
  formatDate: (dateString: string) => string;
  formatCurrency: (amount: number, currency?: string) => string;
  getStatusColor: (status: string) => string;
}
