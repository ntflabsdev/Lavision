import React from 'react';
import orb1 from '../assets/orb1.png';
import orb2 from '../assets/orb2.png';
import orb3 from '../assets/orb3.png';
import orb4 from '../assets/orb4.png';

const images = [
  { src: orb1, className: 'top-0 left-0 -translate-x-1/3 -translate-y-1/3 animate-orb1' },
  { src: orb2, className: 'top-0 right-0 translate-x-1/3 -translate-y-1/3 animate-orb2' },
  { src: orb3, className: 'bottom-0 left-0 -translate-x-1/3 translate-y-1/3 animate-orb3' },
  { src: orb4, className: 'bottom-0 right-0 translate-x-1/3 translate-y-1/3 animate-orb4' },
];

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden z-[-1] bg-[#130B28]">
      {/* Gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-700/40 via-purple-900 to-blue-900/30"></div>

      {/* Orbs */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img.src}
          className={`absolute w-[550px] opacity-[0.65] blur-sm ${img.className}`}
          alt=""
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
