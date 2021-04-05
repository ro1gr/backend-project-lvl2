import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (fixture) => fs.readFileSync(getFixturePath(fixture), 'utf-8');

const expected = {
  stylish: readFixture('stylish-diff.txt'),
  plain: readFixture('plain-diff.txt'),
  json: readFixture('json-diff.txt'),
};

const outputFormats = ['stylish', 'plain', 'json'];

describe.each(outputFormats)('should match expected %s diff', (outputFormat) => {
  const inputFormats = ['json', 'yml'];
  test.each(inputFormats)('%s data', (inputFormat) => {
    const path1 = getFixturePath(`file1.${inputFormat}`);
    const path2 = getFixturePath(`file2.${inputFormat}`);
    expect(genDiff(path1, path2, outputFormat)).toBe(expected[outputFormat]);
  });
});

describe('json diff should be valid', () => {
  test('is valid', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    const jsonDiff = genDiff(path1, path2, 'json');
    expect(() => JSON.parse(jsonDiff)).not.toThrow();
  });
});
