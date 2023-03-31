import { IApi } from 'umi';
const { BundleAnalyzerPlugin } = require('umi-webpack-bundle-analyzer') 

// const { getFilteredModules } = require('./dataTransform');
const Viewer = require('./Viewer');
const { absStatsFilePath } = require('./constant');

export default (api: IApi) => {
  api.describe({
    key: 'compAnalyze',
    config: {
      schema(joi) {
        return joi.object()
      }
    }
  });

  // 修改配置通过 umi-webpack-bundle-analyzer 生成 stats 数据
  // api.modifyConfig((memo) => {
  //   return {
  //     ...memo,
  //     chainWebpack(memo) {
  //       memo.plugin('umi-webpack-bundle-analyzer').use(BundleAnalyzerPlugin, [{
  //         analyzerMode: 'disabled',
  //         openAnalyzer: false,
  //         generateStatsFile: true,
  //         statsFilename: absStatsFilePath
  //       }])
  //     }
  //   }
  // })

  api.registerCommand({
    name: 'analyzeComp',
    description: '分析组件依赖',
    alias: 'ac',
    fn: async function () {
      // 执行构建任务
      api.service.runCommand({
        name: 'build'
      })
    }
  });

  api.onBuildComplete(({ err, stats }) => {
    if (!err) {
      const viewer = new Viewer({ stats });
      // 开始渲染工作流
      viewer.apply()
    }
  });

};