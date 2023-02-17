import { readdirSync, readFileSync } from 'node:fs';
const apis = new Set();

// 路径优化
const filePaths = await readdirSync('../../project/慧客助手/hk-sso/src');
for (const filePath of filePaths) {
  findAPIByFile(filePath);
}

function findAPIByFile(path: string) {
  console.log(path);
  const re = /\/api(\/(\w+)-?(\w+))+/;
  // 存在bug 如何path 不是文件而是目录则会保存
  const fileContent = readFileSync(`../../project/慧客助手/hk-sso/src/${path}`, { encoding: 'utf8' });
  const lines = fileContent
    .split('\n')
    .map((item) => {
      if (item) {
        return item.match(re)?.[0];
      } else {
        return undefined;
      }
    })
    .filter((item) => item);
  lines.forEach((str) => {
    apis.add(str);
  });
}
console.log(apis);
