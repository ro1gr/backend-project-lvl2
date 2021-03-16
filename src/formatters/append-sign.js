export default (indentation, state) => {
  switch (state) {
    case 'added':
      return indentation.slice(2).concat('+ ');
    case 'removed':
      return indentation.slice(2).concat('- ');
    default:
      return indentation;
  }
};
