import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from './store';
import Layout from './layouts/Layout';
import { 
  HomeScreen, 
  QuestionnaireScreen, 
  ResultsScreen, 
  VisionRealizedScreen, 
  DashboardScreen,
  InnerPortalScreen,
  OutsideHomeHubScreen,
  WelcomeHomeScreen,
  DreamCarScreen
} from './screens';
import { ForgotPasswordScreen } from './screens/auth';
import AuthScreen from './screens/auth/AuthScreen';
import Aboutus from './screens/Aboutus';
import PricingPage from './screens/PricingPage';
import ContactPage from './screens/ContactPage';
import ProtectedRoute from './layouts/ProtectedRoute';
import SubscriptionCancel from './components/subscription/SubscriptionCancel';
import SubscriptionSuccess from './components/subscription/SubscriptionSuccess';
import Fab from './components/fab/Fab';
import ReflectionRoom from './screens/ReflectionRoom';
import MirrorScreen from './screens/MirrorScreen';
import FrameScreen from './screens/FrameScreen';
import LawBookScreen from './screens/LawBookScreen';
import CarCenter from './components/CarCenter';
import CarTrial from './screens/CarTrial';
import OutSideCar from './screens/OutSideCar';
import InnerCar from './screens/InnerCar';
import OfficeView from './screens/OfficeView';
import EVEChat from './screens/MainEveSection';

// PayPal configuration
const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
  components: "buttons",
  intent: "subscription",
  vault: true,
};

// Fab ko sirf un routes par dikhana hai jo /welcome-home ke baad aate hain
const FabRouteWrapper = () => {
  const location = useLocation();

  const fabVisiblePaths = [
    '/welcome-home',
    '/inner-portal',
    '/dream-worlds',
    '/outside-home-hub',
    '/dream-car',
    '/car-trail',
    '/outside-car-view',
    '/inner-car-view',
    '/office',
    '/law-book',
    '/personal-elements',
    '/mirror-room',
    '/reflection-room',
    '/questionnaire',
    '/pricing',
    '/vision-realized',
  ];

  const shouldShowFab =
    fabVisiblePaths.some((path) => location.pathname.startsWith(path)) ||
    location.pathname.startsWith('/car');

  return shouldShowFab ? <Fab /> : null;
};


function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Provider store={store}>
        <Router>
          <FabRouteWrapper />
          <Routes>
            {/* Landing now at root */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/getstart" element={<Navigate to="/" replace />} />
            
            {/* New Journey Screens (without Layout) */}
            <Route path="/welcome-home" element={<WelcomeHomeScreen />} />
            <Route path="/inner-portal" element={<InnerPortalScreen />} />
            <Route path="/dream-worlds" element={<OutsideHomeHubScreen />} />
            <Route path='law-book' element={<LawBookScreen />} />
            <Route path='/personal-elements' element={<FrameScreen />} />
            <Route path="/mirror-room" element={<MirrorScreen />} />
            <Route path="/reflection-room" element={<ReflectionRoom />} />
            <Route path="/outside-home-hub" element={<OutsideHomeHubScreen />} />
            <Route path="/car" element={<DreamCarScreen />} />
            <Route path="/car-trail" element={<CarTrial />} />
            <Route path="/outside-car-view" element={<OutSideCar />} />
            <Route path="/inner-car-view" element={<InnerCar />} />
            <Route path="/office" element={<OfficeView  />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path="/questionnaire" element={<QuestionnaireScreen />} />
            <Route element={<Layout />}>
              {/* Auth routes */}
              <Route path="/login" element={<AuthScreen />} />
              <Route path="/register" element={<AuthScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

              {/* App routes */}
              <Route path="/results" element={<ResultsScreen />} />
              <Route path="/vision-realized" element={<VisionRealizedScreen />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/subscription/success" element={<SubscriptionSuccess />} />
              <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardScreen />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </PayPalScriptProvider>
  );
}

export default App;