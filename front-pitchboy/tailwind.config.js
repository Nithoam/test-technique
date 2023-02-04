module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["sans-serif"],
      curve: ['"Yellowtail"', "cursive"],
      pacifico: ["Pacifico"],
      monoton: ["Monoton"],
    },
    extend: {
      gridTemplateColumns: {
        "1/3": "1fr 3fr",
        "2/3": "2fr 3fr",
        "3/2": "3fr 2fr",
      },
      height: {
        full: "100%",
      },
      width: {
        large: "85vw",
      },
    },
  },
  plugins: [],
};
