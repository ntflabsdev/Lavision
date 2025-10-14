import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AiHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiHelpModal = ({ isOpen, onClose }: AiHelpModalProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  const getPageContext = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Home Page',
          content: 'This is the main landing page. You can explore the different sections of the site from here.',
          actions: ['Navigate to About Us', 'Check out the pricing', 'Start the questionnaire'],
        };
      case '/questionnaire':
        return {
          title: 'Questionnaire',
          content: 'Answer these questions to help us build your personalized dream world.',
          actions: ['Go to the next step', 'Go back to the previous step', 'Save your progress'],
        };
      case '/dashboard':
        return {
          title: 'Dashboard',
          content: 'Here you can see your account overview, manage your subscriptions, and view your transaction history.',
          actions: ['View your subscriptions', 'Check your transaction history', 'Update your profile'],
        };
      default:
        return {
          title: 'Help',
          content: 'This is a general help page. Let us know what you need assistance with.',
          actions: ['Contact support', 'Read the FAQ'],
        };
    }
  };

  const { title, content, actions } = getPageContext();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <p className="mb-4">{content}</p>
        <div className="space-y-2">
          <h3 className="font-semibold">What you can do:</h3>
          <ul className="list-disc list-inside">
            {actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AiHelpModal;
