export default (state={}, action) => {
  switch (action.type) {
    case 'MOVIE_LIST':
      return { list: action.payload }
    default:
      return state;
  }
}
