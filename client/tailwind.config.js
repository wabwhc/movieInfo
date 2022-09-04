module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "PosterRatio": "5/7",
        "ShortInfoRatio": "2/1",
        "MovieCardRatio": "10/19",
      },
      minHeight: {
        "minPoster": "300px",
      }
    },
  },
  plugins: [],
};