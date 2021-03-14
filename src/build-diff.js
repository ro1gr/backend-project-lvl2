import _ from 'lodash';
import parseData from './parsers.js';
import determineState from './determine-state.js';

export default (data1, data2) => {
  const initialData = parseData(data1);
  const updatedData = parseData(data2);

  const iter = (currentValue1, currentValue2) => {
    const keys1 = _.keys(currentValue1);
    const keys2 = _.keys(currentValue2);
    const allKeys = _.sortBy(_.union(keys1, keys2));

    return allKeys.reduce((acc, key) => {
      const initialValue = currentValue1[key];
      const updatedValue = currentValue2[key];
      acc[key] = {};
      if (_.isObject(initialValue) && _.isObject(updatedValue)) {
        acc[key] = iter(initialValue, updatedValue);
      } else {
        const state = determineState(initialValue, updatedValue);
        const values = [];
        if (state === 'added') {
          values.push({ $added: updatedValue });
        } else if (state === 'removed') {
          values.push({ $removed: initialValue });
        } else if (state === 'updated') {
          values.push({ $removed: initialValue });
          values.push({ $added: updatedValue });
        } else {
          values.push({ $unchanged: initialValue });
        }
        acc[key] = { $state: state, $values: values };
      }

      return acc;
    }, {});
  };

  return iter(initialData, updatedData);
};
