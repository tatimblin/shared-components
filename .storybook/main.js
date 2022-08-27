const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  "stories": [
    "../features/**/*.stories.mdx",
    "../features/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss"
  ],
  "framework": "@storybook/react",
  "webpackFinal": async (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin({
      configFile: './tsconfig.json',
    })];
    config.module.rules.push({
      test: /\.m?js/,
      resolve: { fullySpecified: false },
    })
    return config;
  },
  "core": {
    builder: 'webpack5',
  },
}
