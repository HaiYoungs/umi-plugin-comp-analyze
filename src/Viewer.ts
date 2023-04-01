const { readFileSync } = require('fs');
const { join } = require('path')
const Mustache: any = require('mustache');
const stringify = require('json-stringify-safe')

const appServer = require('./Server')
const { readStatsPolling, getEffectiveModules } = require('./getModuleMap');
const { getFileTree } = require('./getFileTree');
const { absStatsFilePath, absSrcPath } = require('./constant');

interface IRenderHtml {
    /**文档标题 */
    title: string;
    /**运行时 js 文件名 */
    bundleFileName: string;
    /**组件依赖数据 */
    componentData: any[];
    /**文件树结构 */
    fileTree: any[];
}

/**
 * Escapes `<` characters in JSON to safely use it in `<script>` tag.
 */
function escapeJson(json: any) {
    return stringify(json).replace(/</gu, '\\u003c');
}

/**
 * 渲染依赖关系
 */
class Viewer {
    stats: any[];
    constructor({ stats }: { stats: [] }) {
        this.stats = stats;
    }

    apply() {
        // 读取 stats.json
        // const stats = await readStatsPolling(absStatsFilePath);

        // 获取有效 module 信息
        const modules = getEffectiveModules(this.stats);
        const fileTree = getFileTree(absSrcPath);

        // 生成 html 页面
        const html = this.renderHtml({
            title: '组件依赖分析',
            bundleFileName: 'viewer.js',
            componentData: modules,
            fileTree
        });

        // 开启服务
        const app = new appServer({ html });
        app.start();
    }

    renderHtml({ title, bundleFileName, componentData, fileTree }: IRenderHtml) {
        const htmlTpl = readFileSync(join(__dirname, 'index.tpl'), 'utf8');
        return Mustache.render(htmlTpl, {
            title,
            bundleFileName,
            componentData: escapeJson(componentData),
            fileTree: escapeJson(fileTree)
        })
    }
}

module.exports = Viewer;