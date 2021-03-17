import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const stylishExample = readFileSync(getFixturePath('diffs/stylish-diff.txt'), 'utf-8');
const plainExample = readFileSync(getFixturePath('diffs/plain-diff.txt'), 'utf-8');
const jsonExample = readFileSync(getFixturePath('diffs/json-diff.txt'), 'utf-8');
const table = [
  ['stylish', stylishExample],
  ['plain', plainExample],
  ['json', jsonExample],
];

describe('json diff should work', () => {
  const initialData = getFixturePath('data/deep1.json');
  const updatedData = getFixturePath('data/deep2.json');

  test.each(table)('%s output', (format, example) => {
    expect(genDiff(initialData, updatedData, format)).toBe(example);
  });
});

describe('yaml diff should work', () => {
  const initialData = getFixturePath('data/deep1.yml');
  const updatedData = getFixturePath('data/deep2.yaml');

  test.each(table)('%s output', (format, example) => {
    expect(genDiff(initialData, updatedData, format)).toBe(example);
  });
});
