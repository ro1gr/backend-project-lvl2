import json from './formatters/json.js';
import plain from './formatters/plain.js';
import stylish from './formatters/stylish.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`${format} is not supported. Only stylish, plain and json formats are available.`);
  }
};
