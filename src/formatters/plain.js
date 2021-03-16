import {
  hasChildren,
  getChildren,
  getKey,
  getState,
  getValue,
  plainifyValue,
} from './helpers.js';

export default (diff) => {
  const iter = (currentValue, acc) => {
    const lines = currentValue
      .filter((entry) => getState(entry) !== 'unchanged')
      .flatMap((entry) => {
        const entryKey = getKey(entry);
        const newAcc = acc ? `${acc}.${entryKey}` : entryKey;
        if (hasChildren(entry)) {
          const children = getChildren(entry);
          return `${iter(children, newAcc)}`;
        }
        const entryState = getState(entry);
        const entryValue = getValue(entry);
        const lineStart = `Property '${newAcc}' was ${entryState}`;
        const removedValue = plainifyValue(entryValue.removed);
        const addedValue = plainifyValue(entryValue.added);

        switch (entryState) {
          case 'removed':
            return `${lineStart}`;
          case 'added':
            return `${lineStart} with value: ${addedValue}`;
          case 'updated':
            return `${lineStart}. From ${removedValue} to ${addedValue}`;
          default:
            throw new Error(`${entryState} is not expected. Plain formatter supports only removed, added and updated values.`);
        }
      });
    return lines.join('\n');
  };

  return iter(diff, null);
};
