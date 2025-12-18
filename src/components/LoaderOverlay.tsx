import newLogo from "../assets/newLogo.png";

interface LoaderOverlayProps {
  message?: string;
}

const LoaderOverlay = ({ message = "Loading your world..." }: LoaderOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg">
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Spinning ring */}
        <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-l-fuchsia-400/70 border-r-sky-400/70 border-b-purple-500/60 animate-spin" />

        {/* Glow orb */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#0B1024] via-[#1E1638] to-[#0F0B24] shadow-[0_0_50px_rgba(129,140,248,0.8)]" />

        {/* Center logo */}
        <img
          src={newLogo}
          alt="LaVision loading"
          className="relative w-16 h-16 object-contain animate-pulse"
        />
      </div>
      <p className="mt-6 text-xs tracking-[0.3em] uppercase text-white/70">
        {message}
      </p>
    </div>
  );
};

export default LoaderOverlay;


