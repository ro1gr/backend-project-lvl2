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
const getPropertyName = (paths) => paths.join('.');

export default (diff) => {
  const iter = (node, paths) => {
    const lines = node
      .flatMap((entry) => {
        const newPaths = [...paths, entry.key];
        switch (entry.state) {
          case 'complexValue':
            return iter(entry.children, newPaths);
          case 'removed':
            return `Property '${getPropertyName(newPaths)}' was removed`;
          case 'added':
            return `Property '${getPropertyName(newPaths)}' was added with value: ${formatValue(entry.value)}`;
          case 'updated':
            return `Property '${getPropertyName(newPaths)}' was updated. From ${formatValue(entry.value1)} to ${formatValue(entry.value2)}`;
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
