import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const format = path.extname(filepath);
  if (format === '.json') {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  }
  if (format === '.yml') {
    return yaml.load(fs.readFileSync(filepath, 'utf-8'));
  }
  throw new Error(`${format} not supported.`);
};
