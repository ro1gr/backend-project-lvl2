import _ from 'lodash';

const appendSign = (indentation, state) => {
  switch (state) {
    case '$added':
      return indentation.slice(2).concat('+ ');
    case '$removed':
      return indentation.slice(2).concat('- ');
    default:
      return indentation;
  }
};
const hasState = (obj) => _.has(obj, '$state');
const getState = (obj) => _.keys(obj)[0];
const getValues = (obj) => obj.$values;

export default (diff) => {
  const indentationSpace = ' ';
  const indentationWidth = 4;

  const iter = (currentData, depth) => {
    if (!_.isObject(currentData)) {
      return currentData;
    }

    const indentationSize = depth * indentationWidth;
    const currentIndentation = indentationSpace.repeat(indentationSize);
    const bracketIndentation = indentationSpace.repeat(indentationSize - indentationWidth);
    const lines = _.entries(currentData)
      .reduce((acc, [key, data]) => {
        if (hasState(data)) {
          const values = getValues(data);
          for (const value of values) {
            const state = getState(value);
            acc.push(`${appendSign(currentIndentation, state)}${key}: ${iter(value[state], depth + 1)}`);
          }
        } else {
          acc.push(`${currentIndentation}${key}: ${iter(data, depth + 1)}`);
        }
        return acc;
      }, [])
      .map((line) => line.trimEnd());

    return [
      '{',
      ...lines,
      `${bracketIndentation}}`,
    ].join('\n');
  };

  return iter(diff, 1);
};
