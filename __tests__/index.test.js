import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (fixture) => readFileSync(getFixturePath(fixture), 'utf-8');

const jsonData1 = getFixturePath('file1.json');
const jsonData2 = getFixturePath('file2.json');
const yamlData1 = getFixturePath('file1.yml');
const yamlData2 = getFixturePath('file2.yml');
const expectedStylishResult = readFixture('stylish-diff.txt');
const expectedPlainResult = readFixture('plain-diff.txt');
const expectedJsonResult = readFixture('json-diff.txt');

const runTests = (expectedResult, outputFormat) => {
  const inputFormats = [
    ['json', jsonData1, jsonData2],
    ['yaml', yamlData1, yamlData2],
  ];
  test.each(inputFormats)('%s data', (inputFormat, data1, data2) => {
    expect(genDiff(data1, data2, outputFormat)).toBe(expectedResult);
  });
};

const outputFormats = [
  ['stylish', expectedStylishResult],
  ['plain', expectedPlainResult],
  ['json', expectedJsonResult],
];

describe.each(outputFormats)('should match %s diff', (outputFormat, expectedResult) => {
  runTests(expectedResult, outputFormat);
});
