import _ from 'lodash';
import computeState from './compute-state.js';
import computeValue from './compute-value.js';

export default (initialData, updatedData) => {
  const iter = (currentInitialData, currentUpdatedData) => {
    const initialKeys = Object.keys(currentInitialData);
    const updatedKeys = Object.keys(currentUpdatedData);
    const mergedKeys = _.union(initialKeys, updatedKeys);
    const sortedKeys = _.sortBy(mergedKeys);

    return sortedKeys.map((key) => {
      const initialValue = currentInitialData[key];
      const updatedValue = currentUpdatedData[key];
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

  return iter(initialData, updatedData);
};
