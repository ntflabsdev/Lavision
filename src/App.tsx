import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './layouts/Layout';
import { HomeScreen, QuestionnaireScreen, ResultsScreen, VisionRealizedScreen } from './screens';
import Aboutus from './screens/Aboutus';
import PricingPage from './screens/PricingPage';
import ContactPage from './screens/ContactPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/questionnaire" element={<QuestionnaireScreen />} />
            <Route path="/results" element={<ResultsScreen />} />
            <Route path="/vision-realized" element={<VisionRealizedScreen />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path='/pricing' element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;