export const hasChildren = (obj) => obj.children !== undefined;
export const getChildren = (obj) => obj.children;
export const getKey = (obj) => obj.key;
export const getState = (obj) => obj.state;
export const getValue = (obj) => obj.value;
export const plainifyValue = (value) => {
  if (value === 'true' || value === 'false' || value === null) {
    return value;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};
