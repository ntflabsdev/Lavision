import React from 'react';
import { formatDate } from './utils';

interface DashboardHeaderProps {
  user: {
    firstName?: string;
    createdAt: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.firstName || 'User'}!
          </h1>
          <p className="text-gray-300">
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
