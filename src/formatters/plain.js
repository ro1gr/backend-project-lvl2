import _ from 'lodash';

const formatValue = (value) => {
  if (value === 'true' || value === 'false' || value === null) {
    return value;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

export default (diff) => {
  const iter = (currentValue, acc) => {
    const lines = currentValue
      .filter((entry) => entry.state !== 'unchanged')
      .flatMap((entry) => {
        const newAcc = acc ? `${acc}.${entry.key}` : entry.key;
        if (_.has(entry, 'children')) {
          return `${iter(entry.children, newAcc)}`;
        }
        switch (entry.state) {
          case 'removed':
            return `Property '${newAcc}' was removed`;
          case 'added':
            return `Property '${newAcc}' was added with value: ${formatValue(entry.value2)}`;
          case 'updated':
            return `Property '${newAcc}' was updated. From ${formatValue(entry.value1)} to ${formatValue(entry.value2)}`;
          default:
            throw new Error(`${entry.state} is not expected. Plain formatter supports only removed, added and updated values.`);
        }
      });
    return lines.join('\n');
  };

  return iter(diff, null);
};
