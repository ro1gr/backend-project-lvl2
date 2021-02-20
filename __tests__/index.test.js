// import { test, expect } from '@jest/globals';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

import genDiff from '../index.js';

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const shallowJson1 = '__fixtures__/shallow1.json';
const shallowJson2 = '__fixtures__/shallow2.json';
const shallowDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`

test('shallow diff', () => {
  expect(genDiff(shallowJson1, shallowJson2)).toEqual(shallowDiff);
})
