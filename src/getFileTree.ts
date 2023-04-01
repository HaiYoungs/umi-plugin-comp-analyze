const fs = require("fs");
const path = require("path");

function getFileTree(dir: string) {
  // 不是文件夹
  if (isFile(dir)) return console.log(`${dir} 不是文件夹`);

  // 读取目录
  const files = readDir(dir);

  if (files.length === 0) return console.log(`${dir} 目录为空`);

  const filteredExcludeFiles = files.filter((v: string) => isExcludeDir(v));

  return filteredExcludeFiles.map((item: string) => {
    const filePath = path.join(dir, item);
    if (isDir(filePath)) {
      const children = getFileTree(filePath) || [];
      return {
        path: filePath,
        name: item,
        children,
      };
    }
    return {
      path: filePath,
      name: item,
      children: null,
    };
  });
}

// 判断制定路径是否是文件
function isFile(dir: string) {
  return fs.statSync(dir).isFile();
}

function isDir(dir: string) {
  return fs.statSync(dir).isDirectory();
}

// 过滤 .umi 等临时文件
function isExcludeDir (dirname: string) {
  return dirname.includes('.');
}

// 读取路径下的文件、文件夹
function readDir(dir: string) {
  return fs.readdirSync(dir, (err: Error, files: string) => {
    if (err) throw err;
    return files;
  });
}

module.exports = {
    getFileTree
};

export {}