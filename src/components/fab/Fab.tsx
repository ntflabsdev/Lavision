import { useMemo, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import EVEChat from '../../screens/MainEveSection';
import eva from "../../assets/eva.png";

const Fab = () => {
  const [isHintVisible, setIsHintVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatVariant, setChatVariant] = useState<"full" | "mini">("full");
  const location = useLocation();
  const navigate = useNavigate();

  const videoHeavyPaths = [
    '/welcome-home',
    '/inner-portal',
    '/dream-worlds',
    '/outside-home-hub',
    '/outside-car-view',
    '/inner-car-view',
    '/car',
    '/car-trail',
    '/mirror-room',
    '/reflection-room',
    '/law-book',
    '/personal-elements',
  ];

  const isVideoPage = videoHeavyPaths.some((path) => location.pathname.startsWith(path));

  const togglePopup = () => {
    setIsHintVisible(false);
    setChatVariant(isVideoPage ? "mini" : "full");
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  // Eve guidance text for each page
  const guidanceText = useMemo(() => {
    const path = location.pathname;

    if (path.startsWith('/welcome-home')) {
      return "Welcome to your dream home. • Tap ‘Yes’ to step inside. • Use navigation icons to move ahead.";
    }

    if (path.startsWith('/inner-portal')) {
      return "We’re entering your inner world 🌌 • Follow prompts to continue. • You can always tap me for directions.";
    }

    if (path.startsWith('/dream-worlds') || path.startsWith('/outside-home-hub')) {
      return "Dream Worlds Hub • Home cards open journeys. • Tap a card to enter that world. • Use bottom icons to hop elsewhere.";
    }

    if (path.startsWith('/outside-car-view')) {
      return "Outside Car • Home icon → Dream Worlds. • Office icon → Office tour. • Car icon → Car hub. • Button → go inside the car. • Spacebar → change camera angles.";
    }

    if (path.startsWith('/inner-car-view')) {
      return "Inside Car • Home icon → Dream Worlds. • Office icon → Office tour. • Car icon → Car hub. • Explore the interior freely.";
    }

    if (path.startsWith('/car-trail')) {
      return "Car Trail • Use on-screen controls to drive. • Follow prompts to switch paths.";
    }

    if (path.startsWith('/car')) {
      return "Dream Car Hub • Tap options to configure. • Use icons to jump between outside/inside views. • Ask me for ideas anytime.";
    }

    if (path.startsWith('/office')) {
      return "Office World • Home icon → Dream Worlds. • Explore the workspace and follow prompts to proceed.";
    }

    if (path.startsWith('/mirror-room')) {
      return "Mirror Room • Reflect on choices. • Follow prompts/buttons to continue the journey.";
    }

    if (path.startsWith('/reflection-room')) {
      return "Reflection Room • Review insights here. • Use provided controls to move forward.";
    }

    if (path.startsWith('/law-book')) {
      return "Law Book • Browse principles. • Navigation icons let you hop to other worlds anytime.";
    }

    if (path.startsWith('/personal-elements')) {
      return "Frames & Elements • Adjust visuals and frames. • Navigation icons jump to other worlds.";
    }

    if (path.startsWith('/pricing')) {
      return "Pricing • Compare plans. • Proceed to checkout when ready. • Ask me if you need help choosing.";
    }

    return "I’m Eve, your dream guide 🌙 Tap me and ask anything about your journey here.";
  }, [location.pathname]);

  const handleGuideClick = () => {
   navigate("/pricing");
  };

  return (
    <>
      {/* Eve guidance bubble - fab ke upar stylish animated message */}
      {isHintVisible && (
        <div className="fixed z-[1001] animate-bounce"
             style={{
               width: 'min(331px, 88vw)',
               maxWidth: '90vw',
               right: '1.5rem',
               bottom: '7rem'
             }}>
          <div className="relative">
            <div
              className="text-white rounded-xl shadow-2xl leading-relaxed"
              style={{
                background: 'linear-gradient(90deg, rgba(0,170,255,0.2) 0%, rgba(204,102,255,0.2) 100%)',
                borderRadius: '12px',
                padding: '14px 24px',
                gap: '10px',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)'
              }}
            >
              <p className="font-semibold text-[13px] mb-1">Eve • Your Dream Guide</p>
              <p className="text-[12px] opacity-90">{guidanceText}</p>
              {location.pathname == '/welcome-home' ? (
                <button
                  onClick={handleGuideClick}
                  className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full transition-colors"
                >
                  Yes
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <button
        onClick={togglePopup}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-full hover:scale-110 transition-transform duration-200 z-[1000] shadow-xl"
      >
        <img
          src={eva}
          className="h-20 animate-spin-medium drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
        />
      </button>

      {isChatOpen && (
        <div className="fixed inset-0 z-[1200] pointer-events-none">
          <div className="pointer-events-auto">
            <EVEChat variant={chatVariant} onClose={closeChat} />
          </div>
        </div>
      )}
    </>
  );
};

export default Fab;

