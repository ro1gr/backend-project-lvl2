import _ from 'lodash';

export default (value1, value2) => {
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
