// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./public/index.html"
//   ],
//   theme: {
//     extend: {
//       keyframes: {
//         'fade-in-up': {
//           '0%': {
//             opacity: '0',
//             transform: 'translateY(20px)',
//           },
//           '100%': {
//             opacity: '1',
//             transform: 'translateY(0)',
//           },
//         },
//         marquee: {
//           '0%': { transform: 'translateX(0%)' },
//           '100%': { transform: 'translateX(-50%)' },
//         },
//       },
//       animation: {
//         'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
//         marquee: 'marquee 30s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      keyframes: {
        // Fade In Up
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },

        // Marquee
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },

        // Scroll (optional, same as marquee but different duration)
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        marquee: 'marquee 30s linear infinite',
        scroll: 'scroll 20s linear infinite',
      },
    },
  },
  plugins: [
  function ({ addUtilities }) {
    addUtilities({
      '.no-scrollbar': {
        /* Chrome, Safari and Opera */
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        /* Firefox */
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
    });
  },
],
};
