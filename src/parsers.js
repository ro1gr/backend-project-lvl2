import fs from 'fs';
import yaml from 'js-yaml';

const readData = (input) => {
  if (fs.existsSync(input)) {
    return fs.readFileSync(input);
  }
  return input;
};

export default (input) => {
  const data = readData(input);
  return yaml.load(data);
};
