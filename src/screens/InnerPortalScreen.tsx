import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeInteriorImg from '../assets/homeinterior.png';
import projectLogo from "../assets/newLogo.png";
import homeIcon from "../assets/ion_home.svg";
import { PenSquare, X, ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import innerRightSideView from "../assets/innerHouseRightView.gif"
import innerLeftSideView from "../assets/innerHouseLeftView.gif"
import innerFrontSideView from "../assets/innerHouseFrontView.gif"
import innerBackSideView from "../assets/innerHouseBackView.gif"
import LoaderOverlay from "../components/LoaderOverlay";

type InnerAngleKey = 'front' | 'back' | 'left' | 'right';

type InnerAngleView = {
  key: InnerAngleKey;
  label: string;
  src: string;
};

const innerAngles: InnerAngleView[] = [
  { key: 'front', label: 'Front View', src: innerFrontSideView },
  { key: 'back', label: 'Back View', src: innerBackSideView },
  { key: 'left', label: 'Left View', src: innerLeftSideView },
  { key: 'right', label: 'Right View', src: innerRightSideView },
];

const InnerPortalScreen = () => {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState('');
  const [currentInnerAngleIndex, setCurrentInnerAngleIndex] = useState(0);
  const [isInnerViewActive, setIsInnerViewActive] = useState(false); // false = default image, true = show inner house views
  const [isInnerGifLoading, setIsInnerGifLoading] = useState(false);

  const setInnerAngleByKey = (key: InnerAngleKey) => {
    const idx = innerAngles.findIndex((angle) => angle.key === key);
    if (idx !== -1) {
      setIsInnerViewActive(true);
      setIsInnerGifLoading(true);
      setCurrentInnerAngleIndex(idx);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        setIsInnerViewActive((prevActive) => {
          if (!prevActive) {
            // First space press: activate inner view but keep current index
            setIsInnerGifLoading(true);
            return true;
          }

          // Subsequent presses: move to next angle
          setIsInnerGifLoading(true);
          setCurrentInnerAngleIndex((prev) => (prev + 1) % innerAngles.length);
          return true;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const startMagic = () => {
    navigate("/reflection-room");
  };

  const goHome = () => {
    navigate('/dream-worlds');
  };

  const handleEditSubmit = () => {
    // TODO: hook to real submit/flow
    console.log('Edit submit:', editText);
    setIsEditOpen(false);
    setEditText('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {isInnerViewActive && isInnerGifLoading && (
        <LoaderOverlay message="Loading room view..." />
      )}
      {/* Background Image */}
      {/* Base background (default image) */}
      {!isInnerViewActive && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${homeInteriorImg})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        </div>
      )}

      {/* Fullscreen inner house "video"/gif when active */}
      {isInnerViewActive && (
        <div className="absolute inset-0">
          <img
            src={innerAngles[currentInnerAngleIndex].src}
            alt={innerAngles[currentInnerAngleIndex].label}
            className="w-full h-full object-cover"
            onLoad={() => setIsInnerGifLoading(false)}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col px-4">
        {/* Controls bottom-left */}
        <div className="fixed bottom-6 left-6 flex flex-col gap-3 items-start z-40">
          <button
            onClick={goHome}
            className="w-12 h-12 rounded-full bg-black/50 border border-white/30 backdrop-blur hover:bg-white/10 transition flex items-center justify-center shadow-lg"
            aria-label="Go Home"
          >
            <img src={homeIcon} alt="home" className="w-7 h-7" />
          </button>
          <button
            onClick={() => setIsEditOpen(true)}
            className="w-12 h-12 rounded-full bg-black/50 border border-white/30 backdrop-blur hover:bg-white/10 transition flex items-center justify-center shadow-lg"
            aria-label="Edit"
          >
            <PenSquare size={22} className="text-white" />
          </button>
        </div>

        {/* Edit popup (glass chat-style) */}
        {isEditOpen && (
          <div className="fixed bottom-24 left-6 w-[320px] rounded-2xl overflow-hidden border border-white/12 bg-gradient-to-br from-[#0B1024]/90 via-[#111832]/85 to-[#0F0B24]/90 backdrop-blur-2xl shadow-[0_18px_48px_rgba(0,0,0,0.55)] p-0 z-50">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.16),transparent_35%)]" />
            <div className="relative p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white">
                    <PenSquare size={18} />
                  </span>
                  <div>
                    <p className="text-white font-semibold leading-tight">Quick Edit</p>
                    <p className="text-xs text-white/70">Portal note & copy</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 transition text-white"
                  aria-label="Close edit popup"
                >
                  <X size={16} />
                </button>
              </div>

              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Type your update..."
                className="w-full rounded-xl bg-white/8 border border-white/15 text-black px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-fuchsia-400/60 placeholder:text-white/60"
              />

              <button
                onClick={handleEditSubmit}
                className="w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#6D8BFF] to-[#60A5FA] text-white font-semibold py-2.5 shadow-lg hover:opacity-95 transition"
              >
                Save
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 flex items-center justify-center" />

        <div className="flex flex-col gap-6 items-center pb-16">
          <div className="relative inline-flex items-center justify-center animate-bounce">
            {/* Arrows around logo */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <ArrowUp
                className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer"
                onClick={() => setInnerAngleByKey('front')}
              />
            </div>
            <div className="absolute top-1/2 -left-8 -translate-y-1/2">
              <ArrowLeft
                className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer"
                onClick={() => setInnerAngleByKey('left')}
              />
            </div>
            <div className="absolute top-1/2 -right-8 -translate-y-1/2">
              <ArrowRight
                className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer"
                onClick={() => setInnerAngleByKey('right')}
              />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <ArrowDown
                className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] cursor-pointer"
                onClick={() => setInnerAngleByKey('back')}
              />
            </div>

            <img
              onClick={startMagic}
              src={projectLogo}
              className="w-[100px] rounded-lg cursor-pointer"
              alt="Inner Portal Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnerPortalScreen;
