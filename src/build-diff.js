import _ from 'lodash';

const buildDiff = (data1, data2) => {
  const mergedKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(mergedKeys);

  return sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        key,
        state: 'added',
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        key,
        state: 'removed',
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        state: 'complexValue',
        children: buildDiff(data1[key], data2[key]),
      };
    }
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        state: 'updated',
        value1: data1[key],
        value2: data2[key],
      };
    }
    return {
      key,
      state: 'unchanged',
      value: data1[key],
    };
  });
};

export default buildDiff;
