const { join } = require('path');

module.exports = {
    mode: 'production',
    devtool: 'source-map', 
    // mode: 'development',
    entry: join(__dirname, './src/index.js'),
    output: {
        path: join(__dirname, '../public'),
        filename: 'viewer.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
}