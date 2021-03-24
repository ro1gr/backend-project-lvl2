import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFixture = (fixture) => fs.readFileSync(getFixturePath(fixture), 'utf-8');

const isValidJSON = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (e) {
    return false;
  }
};

const expectedStylishResult = readFixture('stylish-diff.txt');
const expectedPlainResult = readFixture('plain-diff.txt');
const expectedJsonResult = readFixture('json-diff.txt');

const outputFormats = [
  ['stylish'],
  ['plain'],
  ['json'],
];

describe.each(outputFormats)('should match expected %s diff', (outputFormat) => {
  const expected = {
    stylish: expectedStylishResult,
    plain: expectedPlainResult,
    json: expectedJsonResult,
  };
  const inputFormats = [
    ['json'],
    ['yml'],
  ];
  test.each(inputFormats)('%s data', (inputFormat) => {
    const path1 = getFixturePath(`file1.${inputFormat}`);
    const path2 = getFixturePath(`file2.${inputFormat}`);
    expect(genDiff(path1, path2, outputFormat)).toBe(expected[outputFormat]);
  });
});

describe('should return valid JSON', () => {
  test('json diff', () => {
    const path1 = getFixturePath('file1.json');
    const path2 = getFixturePath('file2.json');
    const jsonDiff = genDiff(path1, path2, 'json');
    expect(isValidJSON(jsonDiff)).toBeTruthy();
  });
});
