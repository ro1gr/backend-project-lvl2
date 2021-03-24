import yaml from 'js-yaml';

export default (string, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(string);
    case 'yaml':
      return yaml.load(string);
    default:
      throw new Error(`${format} isn't supported.`);
  }
};
