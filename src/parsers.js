import yaml from 'js-yaml';

const inputFormats = {
  json: JSON.parse,
  yml: yaml.load,
};

export default (data, format) => inputFormats[format](data);
