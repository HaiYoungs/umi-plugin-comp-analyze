const path = require('path');

module.exports = {
    absStatsFilePath: path.join(process.cwd(), 'analyze/stats.json'), //umi-webpack-bundle-analyzer 插件生成的 stats 文件路径
    absSrcPath: path.join(process.cwd(), 'src')
}