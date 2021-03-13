import _ from 'lodash';

export default (diff) => {
  // const getValue = (data) => data.$values[0].$removed;
  const getValue = (data) => {
    const stringifyValue = (value) => {
      if (value === null) {
        return null;
      }
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      if (typeof value === 'object') {
        return '[complex value]';
      }
      if (typeof value === 'string') {
        return `'${value}'`;
      }
      return value;
    };

    const dataState = data.$state;
    const value = {};
    if (dataState === 'updated') {
      value.added = stringifyValue(data.$values[1].$added);
    }
    if (dataState === 'added') {
      value.added = stringifyValue(data.$values[0].$added);
    }
    value.removed = stringifyValue(data.$values[0].$removed);

    return value;
  };

  const iter = (currentValue, acc) => {
    const lines = _.entries(currentValue)
      .filter(([, val]) => val.$state !== 'unchanged')
      .flatMap(([key, val]) => {
        const newAcc = acc ? `${acc}.${key}` : key;
        switch (val.$state) {
          case 'added':
            return `Property '${newAcc}' was added with value: ${getValue(val).added}`;
          case 'removed':
            return `Property '${newAcc}' was removed`;
          case 'updated':
            return `Property '${newAcc}' was updated. From ${getValue(val).removed} to ${getValue(val).added}`;
        }
        return iter(val, newAcc);
      });
    return lines.join('\n');
  };

  return iter(diff, null);
};
