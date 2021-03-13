import buildDiff from './build-diff.js';
import formatDiff from './format-diff.js';

export default (filepath1, filepath2, format) => {
  const diff = buildDiff(filepath1, filepath2);
  const formattedDiff = formatDiff(diff, format);

  return formattedDiff;
}
