/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const klaqColorsV2 = {
  50: "#f3f7fc",
  100: "#e7eff7",
  200: "#c9dcee",
  300: "#99bfe0",
  400: "#629ece",
  500: "#3e82ba",
  600: "#2d669c",
  700: "#25527f",
  800: "#22476a",
  900: "#213c59",
  950: "#16273b",
};

const klaqColors = {
  50: "#f5f8f7",
  100: "#dee9e7",
  200: "#bcd3ce",
  300: "#93b5af",
  400: "#709892",
  500: "#527a75",
  600: "#40615d",
  700: "#364f4c",
  800: "#2e4140",
  900: "#293837",
  950: "#141f1f",
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Inter var", ...defaultTheme.fontFamily.sans],
        poppins: ["Poppins"],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.stone,
      sky: colors.sky,
      neutral: colors.neutral,
      gray: colors.gray,
      slate: colors.slate,
      white: colors.white,
      blue: colors.blue,
      success: colors.emerald,
      warning: colors.orange,
      danger: colors.red,
      pink: colors.pink,
      green: colors.green,
      red: colors.red,
      klaq: klaqColorsV2,
    },
  },
  important: true,
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
