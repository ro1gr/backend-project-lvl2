import _ from 'lodash';

export default (initialValue, updatedValue) => {
  if (_.isEqual(initialValue, updatedValue)) {
    return 'unchanged';
  }
  if (updatedValue === undefined) {
    return 'removed';
  }
  if (initialValue === undefined) {
    return 'added';
  }
  return 'updated';
};
