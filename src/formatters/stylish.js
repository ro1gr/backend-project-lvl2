import _ from 'lodash';

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
    getCurrent(depth) {
      return this.space.repeat(this.width * depth);
    },
    getBracket(depth) {
      return this.space.repeat(this.width * depth - this.width);
    },
  };

  const iterateObject = (currentValue, depth) => {
    if (currentValue === null) {
      return null;
    }
    if (typeof currentValue !== 'object') {
      return currentValue.toString();
    }

    const currentIndentation = indentation.getCurrent(depth);
    const bracketIndentation = indentation.getBracket(depth);

    const lines = Object.entries(currentValue)
      .map(([key, val]) => `${currentIndentation}${key}: ${iterateObject(val, depth + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndentation}}`,
    ].join('\n');
  };

  const iterateArray = (currentValue, depth) => {
    const currentIndentation = indentation.getCurrent(depth);
    const bracketIndentation = indentation.getBracket(depth);

    const lines = currentValue.flatMap((entry) => {
      if (_.has(entry, 'children')) {
        return `${currentIndentation}${entry.key}: ${iterateArray(entry.children, depth + 1)}`;
      }
      switch (entry.state) {
        case 'added':
          return `${appendSign(currentIndentation, 'added')}${entry.key}: ${iterateObject(entry.value2, depth + 1)}`;
        case 'removed':
          return `${appendSign(currentIndentation, entry.state)}${entry.key}: ${iterateObject(entry.value1, depth + 1)}`;
        case 'updated':
          return [
            `${appendSign(currentIndentation, 'removed')}${entry.key}: ${iterateObject(entry.value1, depth + 1)}`,
            `${appendSign(currentIndentation, 'added')}${entry.key}: ${iterateObject(entry.value2, depth + 1)}`,
          ];
        case 'unchanged':
          return `${appendSign(currentIndentation, entry.state)}${entry.key}: ${iterateObject(entry.value1, depth + 1)}`;
        default:
          throw new Error(`Unknown state: ${entry.state}`);
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
