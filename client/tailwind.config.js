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
        greenWidget: "#025a30be",
        overlay: "#09000cb9",
        whiteOrange: "#f5ccbc",
        courtTitle: "#270a01",
        darkCourtTitle: "#dbdada",
      },
      fontFamily: {
        play: ["Play", "sans-serif"],
        golos: ["Golos Text", "sans-serif"],
      },
      boxShadow: {
        inOutFull:
          "0px -23px 25px 0px inset rgba(0, 0, 0, 0.17), 0px -36px 30px 0px inset rgba(0, 0, 0, 0.15), 0px -79px 40px 0px inset rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px",
        mainShadow: "13px 13px 40px #232120cf, -13px -13px 40px #232222c4",
        darkMainShadow: "13px 13px 40px #070707cf, -13px -13px 40px #181716d1",
      },
      backgroundImage: {
        loadingScreen:
          "radial-gradient(circle at 10% 20%, #91ce9f 0%, #ffaf8d 90%)",
        darkLoadingScreen:
          "radial-gradient(circle at 10% 20%, #262526 0%, #171515  90%)",
        mainBg: "linear-gradient(145deg, #d9c9c5, #a28b83)",
        darkMainBg: "linear-gradient(145deg, #2d2c2d, #1f1d1f)",
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
        fadeIn: "fadeIn .3s ease",
        fadeInSlow: "fadeIn 1.5s ease",
        open: "open .2s ease",
        slowSpin: "spin 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
