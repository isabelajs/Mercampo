const path = require("path");

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/componentes/"),
      '@images': path.resolve(__dirname, "src/assets/static/"),
      '@styles': path.resolve(__dirname,"src/assets/styles/")
    }
  }
}