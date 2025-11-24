import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../store/hooks';
import GradientButton from '../../components/GradientButton';

const ForgotPasswordScreen: React.FC = () => {
  const [forgotPasswordMutation] = useForgotPasswordMutation();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await forgotPasswordMutation({ email }).unwrap();
      
      if (res.success) {
        setSuccess('Password reset instructions have been sent to your email');
        setEmail('');
      } else {
        setError('Failed to send reset instructions. Please try again.');
      }
    } catch (err: any) {
      setError(err?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `radial-gradient(circle at top, rgba(159, 94, 176, 0.3), transparent 50%), 
                     radial-gradient(circle at bottom left, rgba(94, 94, 176, 0.3), transparent 50%),
                     linear-gradient(135deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
      }}>
      
      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10 p-8 shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
            <p className="text-gray-400 text-sm">Enter your email to receive reset instructions</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm">
              {success}
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Submit Button */}
            <GradientButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </GradientButton>
          </form>

          {/* Back to Login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Remember your password?{' '}
            <Link to="/login" className="text-purple-400 hover:underline font-medium">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
