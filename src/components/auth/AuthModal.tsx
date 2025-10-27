import React, { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
// import { useAuth } from '../../contexts/AuthContext';
import { useLoginMutation, useRegisterMutation, useForgotPasswordMutation } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { dreamLifeApi } from '../../store/api';
import { signInWithGooglePopup, signInWithApplePopup } from '../../config/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot-password'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  // RTK Query hooks for authentication
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [forgotPasswordMutation] = useForgotPasswordMutation();

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    });
    setError('');
    setSuccess('');
  };

  const handleModeChange = (newMode: 'login' | 'register' | 'forgot-password') => {
    setMode(newMode);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'login') {
        const res = await loginMutation({ email: formData.email, password: formData.password }).unwrap();
        if (res.success) {
          // Save token to localStorage for persistence
          localStorage.setItem('token', res.data.token);
          // Invalidate Auth cache to refetch user data with new token
          dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
          onClose();
          // Small delay to allow cache invalidation to trigger
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          setError('Invalid email or password');
        }
      } else if (mode === 'register') {
        const res = await registerMutation({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }).unwrap();
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          // Invalidate Auth cache to refetch user data with new token
          dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
          onClose();
          // Small delay to allow cache invalidation to trigger
          setTimeout(() => {
            window.location.reload();
          }, 100);
        } else {
          setError('Registration failed. Please check your information.');
        }
      } else if (mode === 'forgot-password') {
        const res = await forgotPasswordMutation({ email: formData.email }).unwrap();
        if (res.success) {
          setSuccess('Password reset instructions sent to your email');
        } else {
          setError('Failed to send reset instructions');
        }
      }
    } catch (err: any) {
      setError(err?.data?.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = async (provider: 'google' | 'apple') => {
    setError('');
    setSuccess('');
    setSocialLoading(provider);
    try {
      // Get Firebase ID token from popup
      const result = provider === 'google' ? await signInWithGooglePopup() : await signInWithApplePopup();
      console.log("social result ",result)
      const idToken = await result.user.getIdToken();
      console.log("idToken ",idToken)
      // Decide whether to register or login based on current mode
      const action = mode === 'register' ? registerMutation : loginMutation;
      const response = await action({ provider, idToken }).unwrap();
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
        onClose();
        setTimeout(() => window.location.reload(), 100);
      } else {
        setError('Social authentication failed');
      }
    } catch (err: any) {
      // Backend or Firebase error
      const code = err?.code;
      if (code === 'auth/operation-not-allowed') {
        setError('Apple sign-in not enabled. Enable Apple provider in Firebase Authentication and configure the Services ID, Team ID, Key ID, and private key.');
      } else {
        setError(err?.data?.message || err?.message || 'Social sign-in failed');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' && 'Welcome Back'}
              {mode === 'register' && 'Create Account'}
              {mode === 'forgot-password' && 'Reset Password'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' && 'Sign in to your LAvision account'}
              {mode === 'register' && 'Join LAvision and start your journey'}
              {mode === 'forgot-password' && 'Enter your email to reset your password'}
            </p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Social auth */}
          {mode !== 'forgot-password' && (
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => handleSocial('google')}
                disabled={socialLoading !== null}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition disabled:opacity-50"
              >
                {socialLoading === 'google' ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">Continue with Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleSocial('apple')}
                disabled={socialLoading !== null}
                className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition disabled:opacity-50"
              >
                {socialLoading === 'apple' ? (
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg viewBox="0 0 14 17" className="w-5 h-5" fill="currentColor"><path d="M13.153 5.56c-.088.07-1.552.89-1.552 2.73 0 2.12 1.89 2.87 1.946 2.89-.008.05-.3 1.06-.988 2.09-.61.94-1.25 1.88-2.26 1.88-.99 0-1.31-.6-2.5-.6-1.16 0-1.57.62-2.53.62-.98 0-1.66-.87-2.27-1.81-.83-1.28-1.5-3.26-1.5-5.13 0-3.02 1.97-4.63 3.9-4.63.99 0 1.81.65 2.47.65.63 0 1.61-.68 2.81-.68.45 0 2.06.04 3.2 1.55Zm-3.77-3.02c.53-.64.89-1.53.79-2.44-.76.03-1.68.5-2.24 1.13-.49.56-.92 1.47-.8 2.34.85.06 1.72-.45 2.25-1.03Z"/></svg>
                )}
                <span className="text-sm font-medium">Continue with Apple</span>
              </button>
              <div className="flex items-center gap-4">
                <span className="flex-grow h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <span className="flex-grow h-px bg-gray-200" />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {mode !== 'forgot-password' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#7F66FF] to-[#CC66FF] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  {mode === 'login' && 'Sign In'}
                  {mode === 'register' && 'Create Account'}
                  {mode === 'forgot-password' && 'Send Reset Link'}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            {mode === 'login' && (
              <>
                <button
                  onClick={() => handleModeChange('forgot-password')}
                  className="text-purple-600 hover:text-purple-700 text-sm mb-4 block"
                >
                  Forgot your password?
                </button>
                <p className="text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <button
                    onClick={() => handleModeChange('register')}
                    className="text-purple-600 hover:text-purple-700 font-semibold"
                  >
                    Sign up
                  </button>
                </p>
              </>
            )}

            {mode === 'register' && (
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <button
                  onClick={() => handleModeChange('login')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot-password' && (
              <p className="text-gray-600 text-sm">
                Remember your password?{' '}
                <button
                  onClick={() => handleModeChange('login')}
                  className="text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
