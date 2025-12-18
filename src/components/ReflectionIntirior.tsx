import { useState } from 'react';
import { PenSquare, X } from 'lucide-react';
import mirrorGif from '../assets/mirror.gif';
import frameScreenVideo from '../assets/frameScreen.mp4';
<<<<<<< HEAD
import LoaderOverlay from './LoaderOverlay';
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0


function ReflectionIntirior({ type }: { type: string }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState('');
<<<<<<< HEAD
  const [isFrameVideoLoading, setIsFrameVideoLoading] = useState(true);
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0

  const handleEditSubmit = () => {
    // TODO: hook up to real save flow
    console.log('Edit submit:', editText);
    setIsEditOpen(false);
    setEditText('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden [background:linear-gradient(180deg,#05051F_16.76%,#9F5EB0_140.63%),linear-gradient(122.01deg,#0A0B10_0%,#1A1339_50%,#402659_100%)]">
<<<<<<< HEAD
      {type !== 'mirror' && isFrameVideoLoading && (
        <LoaderOverlay message="Loading reflection..." />
      )}
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0
      <p className="font-bold text-white mb-8 text-center pt-4 text-[24px]">
        MEN VISUAL
        <span className="bg-gradient-to-r from-[#8B5CF6] to-[#60A5FA] bg-clip-text text-transparent ml-2">
          ELEMENT
        </span>
      </p>

      <div className="flex flex-col justify-center items-center mt-6">
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

        {type === 'mirror' ? (
          // Mirror mode: rectangular glass frame with premium border
          <div className="relative rounded-[30px] p-[4px] bg-gradient-to-br from-white/85 via-white/25 to-transparent shadow-[0_0_65px_rgba(255,255,255,0.55)]">
            {/* Outer halo */}
            <div className="pointer-events-none absolute inset-[-28px] rounded-[38px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(120,70,255,0.55),_transparent_55%)] opacity-85 blur-lg" />

            {/* Main glass body */}
            <div className="relative overflow-hidden rounded-[26px] bg-slate-900/70 border border-white/25 backdrop-blur-2xl shadow-[0_0_75px_rgba(0,0,0,0.95)]">
              {/* Top glossy highlight */}
              <div className="pointer-events-none absolute inset-x-[-8%] -top-[32%] h-1/2 bg-gradient-to-b from-white/45 via-white/12 to-transparent blur-xl opacity-90" />

              {/* Inner rim shine */}
              <div className="pointer-events-none absolute inset-[2px] rounded-[24px] border border-white/22 shadow-[inset_0_0_28px_rgba(255,255,255,0.4)]" />

              {/* Main mirror gif */}
              <div className="relative z-10 w-[820px] h-[520px]">
                <img
                  alt="Mirror Frame"
                  src={mirrorGif}
                  className="w-full h-full object-cover saturate-145 contrast-125 brightness-112"
                />
                {/* Center-focus vignette to feel like real mirror */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.16)_0%,_transparent_45%,_rgba(0,0,0,0.78)_100%)] mix-blend-soft-light" />
              </div>

              {/* Vertical streaks for glass feel */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white/16 via-transparent to-transparent mix-blend-screen" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-fuchsia-400/18 via-transparent to-transparent mix-blend-screen" />
            </div>
          </div>
        ) : (
          // Normal mode: same video without heavy mirror frame
          <video
            autoPlay
            loop
            muted
            src={frameScreenVideo}
            className="object-cover background: var(--white-colour-5-opacity, #FFFFFF0D) rounded-[16px] w-[800px] h-[500px]"
<<<<<<< HEAD
            onLoadedData={() => setIsFrameVideoLoading(false)}
=======
>>>>>>> c6089880bd4a054956f72442ea452f02c08c50c0
          />
        )}
      </div>

      {/* Edit popup (shared for both modes) */}
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
                  <p className="text-xs text-white/70">Mirror & frame text tweaks</p>
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
}

export default ReflectionIntirior;
