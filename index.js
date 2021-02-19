import { readFileSync } from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFileSync(filepath1, 'utf-8'));
  const data2 = JSON.parse(readFileSync(filepath2, 'utf-8'));
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const uniqueKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniqueKeys);
  const resultingLines = [];

  sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      resultingLines.push(`  + ${key}: ${data2[key]}`);
    } else if (!_.has(data2, key)) {
      resultingLines.push(`  - ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      resultingLines.push(`  - ${key}: ${data1[key]}`);
      resultingLines.push(`  + ${key}: ${data2[key]}`);
    } else {
      resultingLines.push(`    ${key}: ${data1[key]}`);
    }
  });
  const result = ['{', ...resultingLines, '}'];

// console.log(`Current directory: ${process.cwd()}`);
  return result.join('\n');
}

// console.log(genDiff('FILES/1.json', 'FILES/2.json'));
