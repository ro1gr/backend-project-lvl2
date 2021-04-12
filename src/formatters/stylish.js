const space = ' ';
const width = 4;

const formatLineIndentation = (depth, sign = ' ') => space.repeat(depth * width).slice(2).concat(`${sign} `);
const formatBracketIndentation = (depth) => space.repeat((depth - 1) * width);
const formatLines = (depth, lines) => [
  '{',
  ...lines,
  `${formatBracketIndentation(depth)}}`,
].join('\n');
const formatValue = (currentValue, depth) => {
  if (typeof currentValue !== 'object') {
    return currentValue;
  }
  if (currentValue === null) {
    return null;
  }

  const lines = Object.entries(currentValue)
    .map(([key, val]) => `${formatLineIndentation(depth)}${key}: ${formatValue(val, depth + 1)}`);

  return formatLines(depth, lines);
};

export default (diff) => {
  const iterateArray = (currentValue, depth) => {
    const lines = currentValue.flatMap((entry) => {
      switch (entry.state) {
        case 'complexValue':
          return `${formatLineIndentation(depth)}${entry.key}: ${iterateArray(entry.children, depth + 1)}`;
        case 'removed':
          return `${formatLineIndentation(depth, '-')}${entry.key}: ${formatValue(entry.value, depth + 1)}`;
        case 'added':
          return `${formatLineIndentation(depth, '+')}${entry.key}: ${formatValue(entry.value, depth + 1)}`;
        case 'updated':
          return [
            `${formatLineIndentation(depth, '-')}${entry.key}: ${formatValue(entry.value1, depth + 1)}`,
            `${formatLineIndentation(depth, '+')}${entry.key}: ${formatValue(entry.value2, depth + 1)}`,
          ];
        case 'unchanged':
          return `${formatLineIndentation(depth)}${entry.key}: ${formatValue(entry.value, depth + 1)}`;
        default:
          throw new Error(`${entry.state} is not expected.`);
      }
    });

    return formatLines(depth, lines);
  };

  return iterateArray(diff, 1);
};
