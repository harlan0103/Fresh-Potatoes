export default (state=null, action) => {
  switch (action.type) {
    case 'CHECK_STATUS':
      return action.payload
    case 'ADD_MOVIE':
      return action.payload
    default:
      return state;

  }
}
