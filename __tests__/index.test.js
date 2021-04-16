import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (fixture) => fs.readFileSync(getFixturePath(fixture), 'utf-8');

const expected = {
  stylish: readFixture('stylish-diff.txt'),
  plain: readFixture('plain-diff.txt'),
  json: readFixture('json-diff.txt'),
};

const outputFormats = Object.keys(expected);
const inputFormats = ['json', 'yml'];

describe.each(inputFormats)('%s data', (inputFormat) => {
  const path1 = getFixturePath(`file1.${inputFormat}`);
  const path2 = getFixturePath(`file2.${inputFormat}`);

  test.each(outputFormats)('%s diff should match expected', (outputFormat) => {
    expect(genDiff(path1, path2, outputFormat)).toBe(expected[outputFormat]);
  });

  test('stylish diff should be returned by default', () => {
    const diff = genDiff(path1, path2);
    expect(diff).toBe(expected.stylish);
  });

  test('json diff should be valid', () => {
    const jsonDiff = genDiff(path1, path2, 'json');
    expect(() => JSON.parse(jsonDiff)).not.toThrow();
  });
});
