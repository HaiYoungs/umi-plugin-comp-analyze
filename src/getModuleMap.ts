import { webpack } from "umi";
const { readFileSync } = require("fs");

interface IStats {
  stats: webpack.Stats[];
}

// 过滤出组件性质的模块
const rexp = /^((?!node_modules|\.umi|\.css|\.less|\.sass).)*src((?!node_modules|\.umi|\.css|\.less|\.sass).)*$/;

/**
 * 过滤出有效模块信息(组件)
 * @param {stats}
 */
function getEffectiveModules(stats: IStats) {
  // umi 会将每次构建信息存储下来，取首次构建的
  return stats.stats[0].compilation.modules
    .filter((item) => rexp.test(item.id))
    .map((item) => {
      const nameArr = item.id.split("/");
      return {
        id: item.id,
        name: nameArr[nameArr.length - 1],
        reasons: item.reasons.map((v: any) => {
          const nameArr = v.module.id.split("/");
          return {
            id: v.module.id,
            name: nameArr[nameArr.length - 1],
            type: v.module.type,
          };
        }),
      };
    });
}

/**
 * 轮询读取 stats.json
 */
function readStatsPolling(path: string) {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      readStats(path)
        .then((stats) => {
          resolve(stats);
          clearInterval(interval);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  });
}

/**
 * 读取 stats.json
 * @param { path }
 */
function readStats(path: string) {
  return new Promise((resolve, reject) => {
    const stats = readFileSync(path, { encoding: "utf8" });
    let statsObj;
    try {
      statsObj = JSON.parse(stats);
      resolve(statsObj);
    } catch (err) {
      console.log(err);
      reject();
    }
  });
}

module.exports = {
  getEffectiveModules,
  readStatsPolling,
};
