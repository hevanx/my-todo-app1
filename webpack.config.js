const { withExpoWebpack } = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await withExpoWebpack(env, argv);
  config.output.publicPath = "./"; // Ensures correct paths for GitHub Pages
  return config;
};
