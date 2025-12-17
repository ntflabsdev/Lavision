import React, { useState, useEffect } from 'react';
import { PenSquare, X } from 'lucide-react';
import lawBookImage from '../assets/lawBook.png';
const LawBookScreen = () => {
  const [currentLaw, setCurrentLaw] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState('');

  const laws = [
    {
      text: '"MY PRESENCE MAKES PEOPLE FEEL DRAWN TO ME INSTANTLY."',
      replaces: '"I MAKE BAD FIRST IMPRESSIONS."'
    },
    {
      text: '"I MOVE WITH CALM CONFIDENCE, AND PEOPLE NATURALLY RESPOND TO MY GROUNDED ENERGY."',
      replaces: '"I GET NERVOUS AROUND PEOPLE."'
    },
    {
      text: '"I TRUST MY VOICE — WHAT I SAY CARRIES CLARITY, VALUE, AND IMPACT."',
      replaces: '"I CAN\'T EXPRESS MYSELF WELL."'
    },
    {
      text: '"I REMAIN STEADY AND CENTERED — CHALLENGES ACTIVATE MY INNER STRENGTH, NOT MY FEAR."',
      replaces: '"I GET OVERWHELMED EASILY."'
    },
    {
      text: '"I CHOOSE THOUGHTS AND ACTIONS THAT ALIGN WITH MY HIGHEST IDENTITY EVERY DAY."',
      replaces: '"I ALWAYS FALL BACK INTO OLD PATTERNS."'
    },
  
  ];

  const currentText = currentLaw < laws.length 
    ? `${laws[currentLaw].text}\n(REPLACES: ${laws[currentLaw].replaces})`
    : '';

  useEffect(() => {
    // Show title first
    if (!showTitle) {
      setTimeout(() => setShowTitle(true), 500);
      return;
    }

    // Type current law
    if (currentIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }

    // Move to next law after pause
    if (currentLaw < laws.length - 1) {
      setTimeout(() => {
        setCurrentLaw(prev => prev + 1);
        setDisplayedText('');
        setCurrentIndex(0);
      }, 1500);
    }
  }, [currentIndex, currentLaw, currentText, showTitle, laws.length]);



  const handleEditSubmit = () => {
    // TODO: hook into actual save/update
    console.log('Law book edit:', editText);
    setIsEditOpen(false);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 flex items-center justify-center p-4 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Inter:wght@700&display=swap');
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Edit controls bottom-left */}
      <div className="fixed bottom-6 left-6 flex items-center gap-3 z-40">
      
        <button
          onClick={() => setIsEditOpen(true)}
          className="w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition backdrop-blur shadow-lg"
          aria-label="Edit"
        >
          <PenSquare size={20} />
        </button>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="relative">
          {/* Scroll Background Image */}
          <img 
            src={lawBookImage}
            alt="Scroll" 
            className="w-full h-auto"
          />
          
          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col items-center pt-[120px] pl-[50px] pr-[50px]">
            {/* Title */}
            {showTitle && (
              <h1 
                className="text-[2.85rem] mb-8 text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  color: '#212121',
                  lineHeight: '100%',
                  textTransform: 'capitalize'
                }}
              >
                The Laws Board
              </h1>
            )}

            {/* Laws Container */}
            <div className="w-full max-h-full overflow-y-auto scrollbar-hide flex-1">
              <div className="space-y-6 px-[20px]">
                {[...Array(currentLaw + 1)].map((_, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    {/* Number Badge */}
                    <div 
                      className="flex-shrink-0 flex items-center justify-center"
                      style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '100%',
                        background: 'linear-gradient(197.26deg, #9B563B 6.43%, #421802 90.94%)',
                        border: '1px solid rgba(0,0,0,0.2)'
                      }}
                    >
                      <span className="text-white text-2xl font-bold">{index + 1}</span>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p 
                        className="whitespace-pre-wrap"
                        style={{
                          fontFamily: "'Cinzel Decorative', serif",
                          fontWeight: 700,
                          fontSize: '18px',
                          lineHeight: '150%',
                          color: '#212121',
                          textTransform: 'capitalize'
                        }}
                      >
                        {index === currentLaw ? displayedText : `${laws[index].text}\n(REPLACES: ${laws[index].replaces})`}
                        {index === currentLaw && currentIndex < currentText.length && (
                          <span className="animate-pulse text-amber-900">|</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      
      </div>

      {/* Edit popup (glass chat-style) */}
      {isEditOpen && (
        <div className="fixed bottom-24 left-6 w-[320px] rounded-2xl overflow-hidden border border-white/12 bg-gradient-to-br from-[#0B1024]/90 via-[#111832]/85 to-[#0F0B24]/90 backdrop-blur-2xl shadow-[0_18px_48px_rgba(0,0,0,0.55)] z-50">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.16),transparent_35%)]" />
          <div className="relative p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white">
                  <PenSquare size={18} />
                </span>
                <div>
                  <p className="text-white font-semibold leading-tight">Quick Edit</p>
                  <p className="text-xs text-white/70">Law board copy</p>
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
    </div>
  );
};

export default LawBookScreen;