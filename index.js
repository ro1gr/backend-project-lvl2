import fs from 'fs';
import path from 'path';
import parseData from './src/parsers.js';
import buildDiff from './src/build-diff.js';
import formatDiff from './src/formatters/index.js';

const getFormat = (filepath) => path.extname(filepath).slice(1);

const getData = (filepath) => {
  const content = fs.readFileSync(filepath, 'utf8');
  const format = getFormat(filepath);
  return parseData(content, format);
};
export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);
  const formattedDiff = formatDiff(diff, format);
  return formattedDiff;
};
