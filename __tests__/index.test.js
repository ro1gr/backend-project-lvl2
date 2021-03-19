import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFixture = (fixture) => readFileSync(getFixturePath(fixture), 'utf-8');

const expectedStylishResult = readFixture('stylish-diff.txt');
const expectedPlainResult = readFixture('plain-diff.txt');
const expectedJsonResult = readFixture('json-diff.txt');

const runTests = (data1, data2) => {
  const cases = [
    ['stylish', expectedStylishResult],
    ['plain', expectedPlainResult],
    ['json', expectedJsonResult],
  ];
  test.each(cases)('%s output', (format, example) => {
    expect(genDiff(data1, data2, format)).toBe(example);
  });
};

describe('should work with JSON', () => {
  const data1 = getFixturePath('file1.json');
  const data2 = getFixturePath('file2.json');
  runTests(data1, data2);
});

describe('should work with YAML', () => {
  const data1 = getFixturePath('file1.yml');
  const data2 = getFixturePath('file2.yml');
  runTests(data1, data2);
});
