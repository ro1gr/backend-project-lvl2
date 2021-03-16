export default (state, initialValue, updatedValue) => {
  switch (state) {
    case 'unchanged':
      return { unchanged: initialValue };
    case 'removed':
      return { removed: initialValue };
    case 'added':
      return { added: updatedValue };
    default:
      return { removed: initialValue, added: updatedValue };
  }
};
