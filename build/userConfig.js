const path = require('path');
const cwd = process.cwd();
const srcPath = path.resolve(cwd, './src');
const pagesPath = path.resolve(cwd, './src/pages');
const publicPath = path.resolve(cwd, './public');
const distPath = path.resolve(cwd, './dist');
const themePath = path.resolve(cwd, './src/theme.scss');


module.exports = {
  paths: {
    src: srcPath,
    pages: pagesPath,
    public: publicPath,
    dist: distPath,
    theme: themePath,
    cwd,
  },
  /* https://webpack.js.org/configuration/dev-server/#devserver */
  devServer: {
    /* https://www.npmjs.com/package/http-proxy-middleware */
    proxy: {
      '/api/*': {
        target: 'http://172.16.30.225:8015',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // rewrite path
        }
      }
    },
  },
}

