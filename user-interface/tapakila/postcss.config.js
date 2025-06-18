const safeParser = require("postcss-safe-parser");

module.exports = {
  parser: safeParser,
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
