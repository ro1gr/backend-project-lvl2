import parseData from './parsers.js';
import buildDiff from './build-diff.js';
import formatDiff from './format-diff.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);
  const diff = buildDiff(data1, data2);
  const formattedDiff = formatDiff(diff, format);

  return formattedDiff;
};
