import plain from './plain.js';
import stylish from './stylish.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff);
    default:
      throw new Error(`${format} is not supported. Only stylish, plain and json formats are available.`);
  }
};
