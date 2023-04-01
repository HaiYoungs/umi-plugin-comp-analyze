process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../webpack.prod');

function buildClient () {
    console.log('正在构建...');
    let compile;
    try {
        compile = webpack(config);
    } catch (error) {
        console.log(error)
    }
    
    try {
        compile.run((err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('构建成功');
            }
        })
    } catch (error) {
        console.log(error)
    }

    
}

buildClient()