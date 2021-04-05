const formatValue = (value) => {
  if (value === null) {
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
      .flatMap((entry) => {
        const newAcc = [...acc, entry.key];
        switch (entry.state) {
          case 'complexValue':
            return `${iter(entry.children, newAcc)}`;
          case 'removed':
            return `Property '${newAcc.join('.')}' was removed`;
          case 'added':
            return `Property '${newAcc.join('.')}' was added with value: ${formatValue(entry.value)}`;
          case 'updated':
            return `Property '${newAcc.join('.')}' was updated. From ${formatValue(entry.value1)} to ${formatValue(entry.value2)}`;
          case 'unchanged':
            return [];
          default:
            throw new Error(`${entry.state} is not expected. Plain formatter supports only removed, added and updated values.`);
        }
      });
    return lines.join('\n');
  };

  return iter(diff, []);
};
