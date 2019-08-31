// This returns the search content of search bar
export default (state=null, action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.payload;
    default:
      return state;
  };
};
