/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#06113C",
        secondary: "#FF6600",
        grey: "#D2CCCC",
        greyLight: "#eaeaea",
        light: "#EEEEEE",
        f4: "#f4f4f4",
        black: "#222021",
        greyDark: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
