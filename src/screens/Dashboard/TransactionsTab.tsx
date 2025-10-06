import React from 'react';
import { formatDate, formatCurrency, getStatusColor } from './utils';

interface Transaction {
  _id: string;
  transactionId: string;
  amount: number;
  currency: string;
  status: string;
  paypalOrderId?: string;
  createdAt: string;
}

interface TransactionsTabProps {
  transactions: Transaction[];
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-4">Transaction History</h3>
      {transactions.length === 0 ? (
        <p className="text-gray-300">No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
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
  );
};

export default TransactionsTab;
