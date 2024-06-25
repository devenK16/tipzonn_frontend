module.exports = {
    presets: ['react-app'],
    plugins: ['babel-plugin-macros'],
    env: {
      production: {
        plugins: ['transform-react-remove-prop-types'],
      },
    },
    overrides: [
      {
        test: /\.m?js$/,
        plugins: [
          [
            'babel-plugin-import',
            {
              libraryName: 'tailwind-merge',
              libraryDirectory: 'dist',
              camel2DashComponentName: false,
            },
            'tailwind-merge',
          ],
        ],
      },
    ],
  };