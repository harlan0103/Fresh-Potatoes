// Return comments for given movie id
export default (state={}, action) => {
  switch (action.type) {
    case 'MOVIE_COMMENT':
      return {data: action.payload};
    default:
      return state;
  }
};
