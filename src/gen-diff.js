import parseData from './parsers.js';
import buildDiff from './build-diff.js';
import formatDiff from './format-diff.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const initialData = parseData(filepath1);
  const updatedData = parseData(filepath2);
  const diff = buildDiff(initialData, updatedData);
  const formattedDiff = formatDiff(diff, format);

  return formattedDiff;
};
