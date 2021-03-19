import _ from 'lodash';
import computeState from './compute-state.js';
import computeValue from './compute-value.js';

const buildDiff = (data1, data2) => {
  const mergedKeys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(mergedKeys);

  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    const entry = { key };
    if (_.isObject(value1) && _.isObject(value2)) {
      const children = buildDiff(value1, value2);
      return { ...entry, children };
    }
    const state = computeState(value1, value2);
    const value = computeValue(state, value1, value2);
    return { ...entry, state, value };
  });
};

export default buildDiff;
