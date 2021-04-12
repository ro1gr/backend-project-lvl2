import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const outputFormats = {
  stylish: (diff) => formatStylish(diff),
  plain: (diff) => formatPlain(diff),
  json: (diff) => JSON.stringify(diff),
};

export default (diff, format) => outputFormats[format](diff);
