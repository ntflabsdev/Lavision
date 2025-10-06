import React from 'react';

interface AccountOverviewProps {
  user: {
    email: string;
    isEmailVerified: boolean;
  };
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-300 text-sm">Email</p>
            <p className="text-white">{user.email}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-gray-300 text-sm">Email Verified</p>
            <p className="text-white">
              {user.isEmailVerified ? '✅ Verified' : '❌ Not Verified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
