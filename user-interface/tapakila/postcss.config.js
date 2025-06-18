const safeParser = require("postcss-safe-parser");

module.exports = {
  parser: safeParser, // évite les erreurs à la con sur les slashs, etc.
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // PAS DE cssnano ici !
  },
};
