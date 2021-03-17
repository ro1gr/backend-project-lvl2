import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const json1 = getFixturePath('deep1.json');
const json2 = getFixturePath('deep2.json');
const yaml1 = getFixturePath('deep1.yml');
const yaml2 = getFixturePath('deep2.yaml');

test('should match stylish example', () => {
  const stylishFixture = getFixturePath('stylish-diff.txt');
  const stylishFixtureData = readFileSync(stylishFixture, 'utf-8');

  expect(genDiff(json1, json2, 'stylish')).toEqual(stylishFixtureData);
});

test('should match plain example', () => {
  const plainFixture = getFixturePath('plain-diff.txt');
  const plainFixtureData = readFileSync(plainFixture, 'utf-8');

  expect(genDiff(json1, json2, 'plain')).toEqual(plainFixtureData);
});

test('json and yaml diff should be equal', () => {
  const jsonStylishDiff = genDiff(json1, json2, 'stylish');
  const yamlStylishDiff = genDiff(yaml1, yaml2, 'stylish');
  const jsonPlainDiff = genDiff(json1, json2, 'plain');
  const yamlPlainDiff = genDiff(yaml1, yaml2, 'plain');

  expect(jsonStylishDiff).toEqual(yamlStylishDiff);
  expect(jsonPlainDiff).toEqual(yamlPlainDiff);
});
