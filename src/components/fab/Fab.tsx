import { MessageSquare, X } from 'lucide-react';
import { useState } from 'react';
import AiChatPopup from './AiChatPopup';

const Fab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-[1000]"
  aria-label="LAvision AI Assistant"
  title="Chat with LAvision AI about dreams, wellness, and goals"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
      <AiChatPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Fab;
