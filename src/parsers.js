import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export default (filepath) => {
  const extension = path.extname(filepath);
  switch (extension) {
    case '.json':
      return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    case '.yaml':
    case '.yml':
      return yaml.load(fs.readFileSync(filepath, 'utf-8'));
    default:
      throw new Error(`${extension} is not supported. Only JSON and YAML files can be parsed.`);
  }
};
