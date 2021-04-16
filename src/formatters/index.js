import formatPlain from './plain.js';
import formatStylish from './stylish.js';

const outputFormats = {
  stylish: formatStylish,
  plain: formatPlain,
  json: JSON.stringify,
};

export default (diff, format) => outputFormats[format](diff);
