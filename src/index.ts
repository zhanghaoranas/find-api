import * as fs from 'node:fs/promises';
const apis: string[] = [];
try {
  const files = await fs.readdir('./mock');
  for (const filePath of files) {
    findAPIByFile(filePath);
  }
} catch (err) {
  console.log(err);
}
async function findAPIByFile(path: string) {
  const re = /\/api(\/\w+)+/;
  const fileContent = await fs.readFile(`./mock/${path}`, { encoding: 'utf8' });
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
  console.log(lines);
}
