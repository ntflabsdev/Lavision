import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLoginMutation } from '../../store/hooks';
import { useAppDispatch } from '../../store/hooks';
import { dreamLifeApi } from '../../store/api';
import { signInWithGooglePopup, signInWithApplePopup } from '../../config/firebase';
import GradientButton from '../../components/GradientButton';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loginMutation] = useLoginMutation();

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
        //     const res = await loginMutation({
        //         email: formData.email,
        //         password: formData.password,
        //     }).unwrap();

        //     if (res.success) {
        //         localStorage.setItem('token', res.data.token);
        //         dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
        //         navigate('/dashboard');
        //     } else {
        //         setError('Invalid email or password');
        //     }
        // } catch (err: any) {
        //     setError(err?.data?.message || 'An error occurred during login');
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleSocial = async (provider: 'google' | 'apple') => {
        setError('');
        setSocialLoading(provider);
        try {
            const result = provider === 'google' ? await signInWithGooglePopup() : await signInWithApplePopup();
            const idToken = await result.user.getIdToken();

            const response = await loginMutation({ provider, idToken }).unwrap();
            if (response.success) {
                localStorage.setItem('token', response.data.token);
                dispatch(dreamLifeApi.util.invalidateTags(['Auth']));
                navigate('/dashboard');
            } else {
                setError('Social login failed');
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

    const stats = [
        { number: '12,847', label: 'Total Worlds Created', icon: '🌐' },
        { number: '45,293', label: 'Active Users', icon: '👥' },
        { number: '3,421', label: 'Creators Online', icon: '⚡' },
        { number: '28,156', label: 'Experiences Published', icon: '✨' }
    ];

    const teamMembers = [
        {
            name: 'Alex Stone',
            role: 'Head of AI',
            image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Maya Rodriguez',
            role: 'CTO & Co-Founder',
            image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Marcus Nova',
            role: 'Head of Generative AI',
            image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
            name: 'Aria Vega',
            role: 'Company Director',
            image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
    ];

    return (
        <div className="min-h-screen"
            style={{
                background: `radial-gradient(circle at top, rgba(159, 94, 176, 0.3), transparent 50%), 
                     radial-gradient(circle at bottom left, rgba(94, 94, 176, 0.3), transparent 50%),
                     linear-gradient(135deg, #0A0B10 0%, #1A1339 50%, #402659 100%)`
            }}>

            {/* Auth Card */}
            <div className="flex items-center justify-center p-4 min-h-screen">
                <div className="w-full max-w-md">
                <div className="backdrop-blur-xl bg-black/40 rounded-3xl border border-white/10 p-8 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
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
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg py-3 font-medium transition disabled:opacity-50"
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
                            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 rounded-lg py-3 font-medium transition disabled:opacity-50"
                        >
                            {socialLoading === 'apple' ? (
                                <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg viewBox="0 0 14 17" className="w-5 h-5" fill="currentColor">
                                    <path d="M13.153 5.56c-.088.07-1.552.89-1.552 2.73 0 2.12 1.89 2.87 1.946 2.89-.008.05-.3 1.06-.988 2.09-.61.94-1.25 1.88-2.26 1.88-.99 0-1.31-.6-2.5-.6-1.16 0-1.57.62-2.53.62-.98 0-1.66-.87-2.27-1.81-.83-1.28-1.5-3.26-1.5-5.13 0-3.02 1.97-4.63 3.9-4.63.99 0 1.81.65 2.47.65.63 0 1.61-.68 2.81-.68.45 0 2.06.04 3.2 1.55Zm-3.77-3.02c.53-.64.89-1.53.79-2.44-.76.03-1.68.5-2.24 1.13-.49.56-.92 1.47-.8 2.34.85.06 1.72-.45 2.25-1.03Z" />
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
                                className="w-full px-4 py-3 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                            />
                        </div>

                        {/* Forgot Password Link */}
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
                                Forgot Password?
                            </Link>
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
                            {isLoading ? 'Signing In...' : 'Continue'}
                        </GradientButton>
                    </form>

                    {/* Register Link */}
                    <p className="text-center text-sm text-gray-400 mt-6">
                        Don't Have An Account?{' '}
                        <Link to="/register" className="text-purple-400 hover:underline font-medium">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
            </div>

            {/* Statistics Section - "Worlds Built On LaVision" */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            Worlds Built On <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LaVision</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 border border-white/10 text-center hover:bg-white/20 transition">
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-300 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission/Vision Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Worlds Built On <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">LaVision</span>
                        </h2>
                        <p className="text-gray-300 text-lg max-w-4xl mx-auto">
                            LaVision Is An Emotional AI Experience Designed To Feel Alive, Conscious, And Deeply Connected To The User. Powered By Eve, A Warm And Intelligent Digital Presence, It Responds With Human-Like Emotion, Adapts To The User's Mood, And Creates A Calming, Affirming Environment That Inspires, Comforts, And Engages Through Voice, Visuals, And Energy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Vision Card */}
                        <div className="backdrop-blur-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Vision</span>
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                LaVision's Mission Is To Create An AI Presence That Feels Alive An Empathetic, Intelligent Companion That Brings Calm, Inspiration, And Purpose To Every Interaction. We Believe In The Power Of Genuine Emotional Connection And Advanced Intelligence With Cinematic Vision To Help Users Feel Understood, Supported, And More Connected To Themselves And Their Dreams.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="backdrop-blur-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl p-8 border border-white/10">
                            <h3 className="text-3xl font-bold text-white mb-6">
                                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Mission</span>
                            </h3>
                            <p className="text-gray-300 leading-relaxed">
                                LaVision's Vision Is To Create A True Feels Alive Emotionally Aware, Deeply Connected, And Capable Of Inspiring Personal Growth. We Design Come Together To Help People Find Clarity, Creativity, And A Deeper Connection With Themselves.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Meet <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Our Team</span>
                        </h2>
                        <p className="text-gray-300 text-xl">
                            Pioneering minds shaping the future of immersive experiences
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="group">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-6 text-white text-center transform group-hover:scale-105 transition-transform duration-300">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-purple-200 text-sm">{member.role}</p>
                                    </div>
                                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LoginScreen;
