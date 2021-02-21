import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const shallowJson1 = getFixturePath('shallow1.json');
const shallowJson2 = getFixturePath('shallow2.json');
const shallowDiff = readFileSync(getFixturePath('shallow-diff.txt'), 'utf-8');

test('shallow diff', () => {
  expect(genDiff(shallowJson1, shallowJson2)).toEqual(shallowDiff);
});
