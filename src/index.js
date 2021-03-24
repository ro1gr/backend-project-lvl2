import fs from 'fs';
import parseData from './parsers.js';
import buildDiff from './build-diff.js';
import formatDiff from './format-diff.js';

const getData = (data) => {
  if (fs.existsSync(data)) {
    return fs.readFileSync(data);
  }
  return data;
};
const getFormat = (string) => {
  try {
    JSON.parse(string);
    return 'json';
  } catch {
    return 'yaml';
  }
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const format1 = getFormat(data1);
  const format2 = getFormat(data2);
  const diff = buildDiff(parseData(data1, format1), parseData(data2, format2));
  const formattedDiff = formatDiff(diff, format);

  return formattedDiff;
};
