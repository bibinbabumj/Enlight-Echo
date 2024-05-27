/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      // font size and the line height
      sx: ["10px", "14px"],
      sm: ["12px", "18px"],
      base: ["14px", "17.5px"],
      lg: ["16px", "19.5px"],
      xl: ["20px", "24px"],
      "2xl": ["20px", "26px"],
      "3xl": ["28px", "27px"],
      "4xl": ["38px", "30px"],
      "5xl": ["50px", "32px"],
    },

    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#242424",
        "light-gray": "#CCCCCC",
        grey: "#808080",
        "dark-grey": "#333333",
        transparent: "transparent",
        violet: "#8A2BE2",
        red: "#FF0000",
        "twitter-x": "#00acee",
        "very-dark-gray": "#1E1E1E",
      },
      fontFamily: {
        inter: ["'Inter'",'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        poppins: ["'Poppins'",'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
