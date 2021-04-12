import yaml from 'js-yaml';

const inputFormats = {
  json: (data) => JSON.parse(data),
  yml: (data) => yaml.load(data),
};

export default (data, format) => inputFormats[format](data);
