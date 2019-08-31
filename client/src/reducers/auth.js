
const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  message: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SIGN_UP':
      return { ...state, isSignedIn: true, userId: action.payload.username, message: null };
    case 'ERROR':
      return { ...state, isSignedIn: false, message: action.payload, userId: null };
    case 'LOG_IN':
      return { ...state, isSignedIn: true, userId: action.payload.username, message:null };
    case 'LOG_OUT':
      return { ...state, isSignedIn: null, userId: null, message: null };
    default:
      return state;
  }
}
