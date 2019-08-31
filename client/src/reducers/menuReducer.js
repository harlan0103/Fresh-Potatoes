// This is the menuReducer to handle current selected menu
// The state will contains the current selected menu and show as active in Header.js

export default (state=null, action) => {
  switch (action.type) {
    case 'home':
      return 'home';
    case 'boxoffice':
      return 'boxoffice';
    case 'search':
      return 'search';
    case 'gallery':
      return 'gallery';
    case 'about':
      return 'about';
    default:
      return state;
  };
};
