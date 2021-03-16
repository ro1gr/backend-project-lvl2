import _ from 'lodash';
import parseData from './parsers.js';
import computeState from './compute-state.js';
import computeValue from './compute-value.js';

export default (filepath1, filepath2) => {
  const data1 = parseData(filepath1);
  const data2 = parseData(filepath2);

  const iter = (initialData, updatedData) => {
    const initialKeys = Object.keys(initialData);
    const updatedKeys = Object.keys(updatedData);
    const mergedKeys = _.union(initialKeys, updatedKeys);
    const sortedKeys = [...mergedKeys].sort();

    return sortedKeys.map((key) => {
      const initialValue = initialData[key];
      const updatedValue = updatedData[key];
      const entry = { key };
      if (_.isObject(initialValue) && _.isObject(updatedValue)) {
        entry.children = iter(initialValue, updatedValue);
        return entry;
      }
      const state = computeState(initialValue, updatedValue);
      const value = computeValue(state, initialValue, updatedValue);
      return { ...entry, state, value };
    });
  };

  return iter(data1, data2);
};
