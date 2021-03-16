import _ from 'lodash';
import appendSign from './append-sign.js';
import {
  hasChildren,
  getChildren,
  getKey,
  getState,
  getValue,
} from './helpers.js';

export default (diff) => {
  const indentationSpace = ' ';
  const indentationWidth = 4;

  const iter = (currentValue, depth) => {
    if (currentValue === null) {
      return null;
    }
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }
    const indentationSize = depth * indentationWidth;
    const currentIndentation = indentationSpace.repeat(indentationSize);
    const bracketIndentation = indentationSpace.repeat(indentationSize - indentationWidth);

    if (_.isArray(currentValue)) {
      const lines = currentValue.flatMap((entry) => {
        const entryKey = getKey(entry);
        if (hasChildren(entry)) {
          const children = getChildren(entry);
          return `${currentIndentation}${entryKey}: ${iter(children, depth + 1)}`;
        }
        const entryState = getState(entry);
        const entryValue = getValue(entry);
        if (entryState === 'updated') {
          return [
            `${appendSign(currentIndentation, 'removed')}${entryKey}: ${iter(entryValue.removed, depth + 1)}`,
            `${appendSign(currentIndentation, 'added')}${entryKey}: ${iter(entryValue.added, depth + 1)}`,
          ];
        }
        return `${appendSign(currentIndentation, entryState)}${entryKey}: ${iter(entryValue[entryState], depth + 1)}`;
      })
        .map((line) => line.trimEnd());

      return [
        '{',
        ...lines,
        `${bracketIndentation}}`,
      ].join('\n');
    }

    const lines = _.entries(currentValue)
      .map(([key, val]) => `${currentIndentation}${key}: ${iter(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndentation}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};
