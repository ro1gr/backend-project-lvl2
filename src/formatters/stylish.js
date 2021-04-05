const appendSign = (indentation, state) => {
  switch (state) {
    case 'added':
      return indentation.slice(2).concat('+ ');
    case 'removed':
      return indentation.slice(2).concat('- ');
    default:
      return indentation;
  }
};

export default (diff) => {
  const indentation = {
    space: ' ',
    width: 4,
  };

  const iterateObject = (currentValue, depth) => {
    if (currentValue === null) {
      return null;
    }
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const indentationSize = depth * indentation.width;
    const currentIndentation = indentation.space.repeat(indentationSize);
    const bracketIndentation = indentation.space.repeat(indentationSize - indentation.width);

    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${currentIndentation}${key}: ${iterateObject(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndentation}}`,
    ].join('\n');
  };

  const iterateArray = (currentValue, depth) => {
    const indentationSize = depth * indentation.width;
    const currentIndentation = indentation.space.repeat(indentationSize);
    const bracketIndentation = indentation.space.repeat(indentationSize - indentation.width);

    const lines = currentValue.flatMap((entry) => {
      switch (entry.state) {
        case 'complexValue':
          return `${currentIndentation}${entry.key}: ${iterateArray(entry.children, depth + 1)}`;
        case 'updated':
          return [
            `${appendSign(currentIndentation, 'removed')}${entry.key}: ${iterateObject(entry.value1, depth + 1)}`,
            `${appendSign(currentIndentation, 'added')}${entry.key}: ${iterateObject(entry.value2, depth + 1)}`,
          ];
        default:
          return `${appendSign(currentIndentation, entry.state)}${entry.key}: ${iterateObject(entry.value, depth + 1)}`;
      }
    });

    return [
      '{',
      ...lines,
      `${bracketIndentation}}`,
    ].join('\n');
  };

  return iterateArray(diff, 1);
};
