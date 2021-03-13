import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import parseData from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const jsonFile = getFixturePath('deep1.json');
const yamlFile = getFixturePath('deep1.yml');
const jsonData = parseData(jsonFile);
const yamlData = parseData(yamlFile);

test('parsed data should be an object', () => {
  expect(typeof jsonData).toBe('object');
});
test('parsed data should not be null', () => {
  expect(jsonData).not.toBeNull();
});
test('parsed JSON should be equal to parsed YAML', () => {
  expect(jsonData).toEqual(yamlData);
});
test('only JSON and YAML files can be parsed', () => {
  const diffFile = getFixturePath('stylish-diff.txt');
  expect(() => {
    parseData(diffFile);
  }).toThrow();
});
