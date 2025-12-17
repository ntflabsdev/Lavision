import orb4 from '../assets/orb4.png';
import orb5 from '../assets/orb5.png';

const images = [
  // Top-centerish glow
  {
    src: orb5,
    positionClass: 'absolute top-[40%] left-[10%] -translate-x-1/2 -translate-y-1/4',
    sizeClass: 'w-[986px] h-[992px]',
    animationClass: 'animate-orbit',
  },
  // Right side glow
  {
    src: orb5,
    positionClass: 'absolute top-[-23%] right-[-29%]',
    sizeClass: 'w-[1000px] h-[1000px]',
    animationClass: 'animate-orbit-delayed',
  },
  // Left middle / bottom glow
  {
    src: orb4,
    positionClass: 'absolute bottom-[73%] left-[20%]',
    sizeClass: 'w-[350px] h-[350px]',
    animationClass: 'animate-orbit-delayed-2',
  },
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1] bg-[#050515]">
      {/* Orbs */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`${img.positionClass} pointer-events-none`}
        >
          <div className={img.animationClass}>
            <img
              src={img.src}
              className={`${img.sizeClass} blur-[6px] opacity-80`}
              alt=""
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimatedBackground;
