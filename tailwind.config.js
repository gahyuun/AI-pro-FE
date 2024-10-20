/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C26",
        secondary: "#272836",
        purple: "rgb(92,0,244)",
        customBlack: "#0D0D0D",
        customBlack20: "#18181B",
      },
    },
  },
  plugins: [],
};
