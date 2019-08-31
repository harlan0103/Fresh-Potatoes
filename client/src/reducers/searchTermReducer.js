// This return user search movie results
export default (state={}, action) => {
  switch (action.type) {
    case 'SUBMIT_SEARCH':
      return {result: action.payload};
    default:
      return state;
  }
}
