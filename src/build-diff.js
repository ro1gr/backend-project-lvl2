import _ from 'lodash';

const fillEntry = (entry, value1, value2) => {
  if (_.isEqual(value1, value2)) {
    return { ...entry, state: 'unchanged', value: { unchanged: value1 } };
  }
  if (value2 === undefined) {
    return { ...entry, state: 'removed', value: { removed: value1 } };
  }
  if (value1 === undefined) {
    return { ...entry, state: 'added', value: { added: value2 } };
  }
  return { ...entry, state: 'updated', value: { removed: value1, added: value2 } };
};

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
    return fillEntry(entry, value1, value2);
  });
};

export default buildDiff;
