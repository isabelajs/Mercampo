const path = require("path");

//coments to test
module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, "src/componentes/"),
      '@images': path.resolve(__dirname, "src/assets/static/"),
      '@styles': path.resolve(__dirname,"src/assets/styles/"),
      '@hooks': path.resolve(__dirname,"src/utils/Hooks/"),
      '@helpers': path.resolve(__dirname,"src/utils/Helpers/"),
      '@utils': path.resolve(__dirname,"src/utils/"),
      '@actions': path.resolve(__dirname,"src/actions/")
    }
  }
}