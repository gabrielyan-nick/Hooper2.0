/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGreen: "#05b962",
      },
      backgroundImage: {
        loadingScreen:
          "radial-gradient(circle at 10% 20%, #91ce9f 0%, #ffaf8d 90%)",
        darkLoadingScreen:
          "radial-gradient(circle at 10% 20%, #262526 0%, #171515  90%)",
      },
      keyframes: {
        open: {
          "0%": {
            opacity: 0,
            transform: "scale(0.97)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1)",
          },
        },

        fadeIn: {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      },
      animation: {
        fadeIn: "fadeIn .3 ease",
        open: "open .2s ease",
      },
    },
  },
  plugins: [],
};
