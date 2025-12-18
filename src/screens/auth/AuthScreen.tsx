import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

type AuthMode = 'login' | 'register';

// Ab URL clean rahega (sirf "/"), mode sirf internal state se change hoga
const AuthScreen: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const location = useLocation();
  const navigate = useNavigate();

  // URL ke basis par mode set karo
  useEffect(() => {
    if (location.pathname === '/register') {
      setMode('register');
    } else {
      setMode('login');
    }
  }, [location.pathname]);

  // Global flag so Layout jaane ki abhi Register screen active hai
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Auth landing par footer hide rakhna hai (login + register)
      (window as any).__isAuthPage = true;
      (window as any).__isRegisterPage = mode === 'register';
    }
    return () => {
      if (typeof window !== 'undefined') {
        (window as any).__isAuthPage = false;
        (window as any).__isRegisterPage = false;
      }
    };
  }, [mode]);

  if (mode === 'login') {
    return <LoginScreen onSwitchToRegister={() => navigate('/register')} />;
  }

  return <RegisterScreen onSwitchToLogin={() => navigate('/login')} />;
};

export default AuthScreen;



