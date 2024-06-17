const path = require('path') // nodeJS module manipulate file path
const webpack = require('webpack')

const config = (env, argv) => {
    console.log('argv', argv.mode)

    const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

    return {
    entry:'./src/index.js',
    output:{
        path: path.resolve(__dirname, 'build'),// path.resolve() method resolves a sequence of paths or path segments into an absolute path
        filename: 'main.js'
    },
    devServer: {
     static: path.resolve(__dirname, 'build'),
     compress: true,
     port: 3000
    },
    devtool:'source-map',//map errors that occur during the execution of the bundle to the corresponding part in the original source code.
    module: {
        rules: [
          {
            test: /\.js$/,// test property specifies the loader is for files that have names ending with .js.
            loader: 'babel-loader',
            options: {//Babel presets can act as sharable set of Babel plugins and/or config options.
              presets: ['@babel/preset-env','@babel/preset-react'],
            },
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          }
        ],
      },
      plugins: [
        new webpack.DefinePlugin({//use webpack's DefinePlugin for defining global default constants that can be used in the bundled code.
          BACKEND_URL: JSON.stringify(backend_url)//define a new global constant BACKEND_URL that gets a different value depending on the environment that the code is being bundled for:


        })
      ]
}
}


module.exports = config
