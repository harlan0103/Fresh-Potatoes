export default (state = {}, action) => {
  switch (action.type) {
    case 'MOVIE_DETAIL':
      return { data: action.payload }
    default:
      return state;
  }
};
