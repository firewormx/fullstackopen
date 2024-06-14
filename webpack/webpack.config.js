const path = require('path') // nodeJS module manipulate file path

const config = {
 entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'build'),// path.resolve() method resolves a sequence of paths or path segments into an absolute path
        filename: 'main.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react'],
            },
          },
        ],
      },
}


module.exports = config
