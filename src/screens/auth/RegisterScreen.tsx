import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { dreamLifeApi } from '../../store/api';
import { signInWithGooglePopup, signInWithApplePopup } from '../../config/firebase';
import GradientButton from '../../components/GradientButton';
import AnimatedBackground from '../../components/AnimatedBackground';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [registerMutation] = useRegisterMutation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<'google' | 'apple' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
   navigate('/questionnaire');

    // try {
    //   const res = await registerMutation({
    //     email: formData.email,
    //     password: formData.password,
    //   }).unwrap();
      
    //   if (res.success) {
    //     localStorage.setItem('token', res.data.token);
    //     dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
    //     navigate('/dashboard');
    //   } else {
    //     setError('Registration failed. Please try again.');
    //   }
    // } catch (err: any) {
    //   setError(err?.data?.message || 'An error occurred during registration');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleSocial = async (provider: 'google' | 'apple') => {
    setError('');
    setSocialLoading(provider);
    try {
      const result = provider === 'google' ? await signInWithGooglePopup() : await signInWithApplePopup();
      const idToken = await result.user.getIdToken();
      
      const response = await registerMutation({ provider, idToken }).unwrap();
      if (response.success) {
        localStorage.setItem('token', response.data.token);
        dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
        navigate('/dashboard');
      } else {
        setError('Social registration failed');
      }
    } catch (err: any) {
      const code = err?.code;
      if (code === 'auth/operation-not-allowed') {
        setError(`${provider === 'apple' ? 'Apple' : 'Google'} sign-in not enabled. Please contact support.`);
      } else {
        setError(err?.data?.message || err?.message || 'Social sign-in failed');
      }
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      {/* Auth Card */}
      <div className="w-full max-w-md">
        <div className="bg-[#1C1C2D] rounded-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create An Account</h1>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => handleSocial('google')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-3 font-medium transition disabled:opacity-50"
            >
              {socialLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              )}
              <span>Continue With Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocial('apple')}
              disabled={socialLoading !== null}
              className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg py-3 font-medium transition disabled:opacity-50"
            >
              {socialLoading === 'apple' ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg viewBox="0 0 14 17" className="w-5 h-5" fill="currentColor">
                  <path d="M13.153 5.56c-.088.07-1.552.89-1.552 2.73 0 2.12 1.89 2.87 1.946 2.89-.008.05-.3 1.06-.988 2.09-.61.94-1.25 1.88-2.26 1.88-.99 0-1.31-.6-2.5-.6-1.16 0-1.57.62-2.53.62-.98 0-1.66-.87-2.27-1.81-.83-1.28-1.5-3.26-1.5-5.13 0-3.02 1.97-4.63 3.9-4.63.99 0 1.81.65 2.47.65.63 0 1.61-.68 2.81-.68.45 0 2.06.04 3.2 1.55Zm-3.77-3.02c.53-.64.89-1.53.79-2.44-.76.03-1.68.5-2.24 1.13-.49.56-.92 1.47-.8 2.34.85.06 1.72-.45 2.25-1.03Z"/>
                </svg>
              )}
              <span>Continue With Apple</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <span className="flex-grow h-px bg-gray-600" />
            <span className="text-sm text-gray-400">or</span>
            <span className="flex-grow h-px bg-gray-600" />
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
              <p className="text-xs text-purple-400 mt-2">Password Must Contain At Least 8 Characters</p>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-400 text-center">
              By Signing Up Or Logging In, You Agree To Our{' '}
              <Link to="/terms" className="text-purple-400 hover:underline">Terms Of Use</Link>
              {' '}And{' '}
              <Link to="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>
            </p>

            {/* Submit Button */}
            <GradientButton type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating Account...' : 'Continue'}
            </GradientButton>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Have An Account?{' '}
            <Link to="/login" className="text-purple-400 hover:underline font-medium">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
