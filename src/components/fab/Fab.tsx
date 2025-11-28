import { useState } from 'react';
import AiChatPopup from './AiChatPopup';
import eva from "../../assets/eva.png";
const Fab = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 bg-gradient-to-r p-4 rounded-full  hover:scale-110 transition-transform duration-200 z-[1000]"
      >
        <img
          src={eva}
          className="w-20 h-20 animate-spin-medium"
        />
      </button>
      <AiChatPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Fab;
