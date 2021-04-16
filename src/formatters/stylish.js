const spacesCount = 4;

const getIndent = (depth, marker = ' ') => ' '.repeat(depth * spacesCount - 2).concat(`${marker} `);
const formatValue = (currentValue, depth) => {
  if (typeof currentValue !== 'object') {
    return currentValue;
  }
  if (currentValue === null) {
    return null;
  }

  const lines = Object.entries(currentValue)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`);

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * spacesCount)}    }`;
};

export default (diff) => {
  const iterateArray = (currentValue, depth) => {
    const lines = currentValue.flatMap((entry) => {
      switch (entry.state) {
        case 'complexValue':
          return `${getIndent(depth)}${entry.key}: ${iterateArray(entry.children, depth + 1)}`;
        case 'removed':
          return `${getIndent(depth, '-')}${entry.key}: ${formatValue(entry.value, depth)}`;
        case 'added':
          return `${getIndent(depth, '+')}${entry.key}: ${formatValue(entry.value, depth)}`;
        case 'updated':
          return [
            `${getIndent(depth, '-')}${entry.key}: ${formatValue(entry.value1, depth)}`,
            `${getIndent(depth, '+')}${entry.key}: ${formatValue(entry.value2, depth)}`,
          ];
        case 'unchanged':
          return `${getIndent(depth)}${entry.key}: ${formatValue(entry.value, depth)}`;
        default:
          throw new Error(`${entry.state} is not expected.`);
      }
    });

    return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * spacesCount)}}`;
  };

  return iterateArray(diff, 1);
};
