import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const stylishExamplePath = getFixturePath('diffs/stylish-diff.txt');
const plainExamplePath = getFixturePath('diffs/plain-diff.txt');
const jsonExamplePath = getFixturePath('diffs/json-diff.txt');
const stylishExample = readFileSync(stylishExamplePath, 'utf-8');
const plainExample = readFileSync(plainExamplePath, 'utf-8');
const jsonExample = readFileSync(jsonExamplePath, 'utf-8');

const runTests = (initialData, updatedData) => {
  const cases = [
    ['stylish', stylishExample],
    ['plain', plainExample],
    ['json', jsonExample],
  ];
  test.each(cases)('%s output', (format, example) => {
    expect(genDiff(initialData, updatedData, format)).toBe(example);
  });
};

describe('should work with JSON', () => {
  const initialData = getFixturePath('data/deep1.json');
  const updatedData = getFixturePath('data/deep2.json');
  runTests(initialData, updatedData);
});

describe('should work with YAML', () => {
  const initialData = getFixturePath('data/deep1.yml');
  const updatedData = getFixturePath('data/deep2.yaml');
  runTests(initialData, updatedData);
});
