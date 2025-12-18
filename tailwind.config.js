/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
theme: {
    extend: {
      keyframes: {
        blob1: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(60px, -40px) scale(1.18)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob2: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-50px, 50px) scale(1.15)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob3: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(40px, 60px) scale(1.22)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        blob4: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(-60px, -20px) scale(1.2)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
           blur: {
        '13': '13.33px',
      }
      },
      animation: {
        blob1: "blob1 18s ease-in-out infinite",
        blob2: "blob2 22s ease-in-out infinite",
        blob3: "blob3 20s ease-in-out infinite",
        blob4: "blob4 26s ease-in-out infinite",
        "spin-slow": "spin 40s linear infinite",
      },
    },
  },
  plugins: [],
};
