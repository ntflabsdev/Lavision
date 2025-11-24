import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { store } from './store';
import Layout from './layouts/Layout';
import { HomeScreen, QuestionnaireScreen, ResultsScreen, VisionRealizedScreen, DashboardScreen } from './screens';
import { LoginScreen, RegisterScreen, ForgotPasswordScreen } from './screens/auth';
import Aboutus from './screens/Aboutus';
import PricingPage from './screens/PricingPage';
import ContactPage from './screens/ContactPage';
import ProtectedRoute from './layouts/ProtectedRoute';
import SubscriptionCancel from './components/subscription/SubscriptionCancel';
import SubscriptionSuccess from './components/subscription/SubscriptionSuccess';
import Fab from './components/fab/Fab';

// PayPal configuration
const paypalOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "YOUR_PAYPAL_CLIENT_ID",
  components: "buttons",
  intent: "subscription",
  vault: true,
};


function App() {
  return (
    <PayPalScriptProvider options={paypalOptions}>
      <Provider store={store}>
        <Router>
          <Fab />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route element={<Layout />}>
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/questionnaire" element={<QuestionnaireScreen />} />
              <Route path="/results" element={<ResultsScreen />} />
              <Route path="/vision-realized" element={<VisionRealizedScreen />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path='/pricing' element={<PricingPage />} />
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