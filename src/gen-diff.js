import _ from 'lodash';
import parseData from './parsers.js';
import json from './formatters/json.js';
import plain from './formatters/plain.js';
import stylish from './formatters/stylish.js';

export default (data1, data2, format) => {
  const initialData = parseData(data1);
  const updatedData = parseData(data2);

  const getState = (value1, value2) => {
    if (value1 === undefined) {
      return 'added';
    }
    if (value2 === undefined) {
      return 'removed';
    }
    if (!_.isEqual(value1, value2)) {
      return 'updated';
    }
    return 'unchanged';
  };
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
        const state = getState(initialValue, updatedValue);
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

  const diff = iter(initialData, updatedData);

  if (format === 'stylish') {
    return stylish(diff);
  }
  if (format === 'plain') {
    return plain(diff);
  }
  if (format === 'json') {
    return json(diff);
  }
  throw new Error(`${format} not supported.`);
};
