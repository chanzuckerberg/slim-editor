const path = require('path');

function exec(env) {
  const config = {
    entry: {
      app: './src/index.js',
      demo: './src/demo.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'devDist'),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-class-properties', 'transform-object-rest-spread'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    stats: {
      colors: true,
      progress: true,
    },
  };

  if (env.NODE_ENV === 'development') {
    config.devtool = 'eval';
  }

  return config;
}

module.exports = exec;
