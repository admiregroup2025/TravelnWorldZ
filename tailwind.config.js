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
      // 👇 Custom animations (keep your original)
      keyframes: {
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
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
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

      // 👇 Optional: Define reusable responsive card widths
      minWidth: {
        'card-sm': '220px',
        'card-md': '260px',
        'card-lg': '280px',
        'card-xl': '300px',
        'card-2xl': '320px',
      },
    },
  },

  // 👇 Hide scrollbar globally via utility
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
};
