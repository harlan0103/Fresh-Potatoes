// Return current boxoffice item
export default (state={}, action) => {
  switch (action.type) {
    case 'domestic':
      return { item: 'domestic', data: action.payload };
    case 'worldwide':
      return { item: 'worldwide', data: action.payload };
    case 'weekend':
      return { item: 'weekend', data: action.payload };
    default:
      return state;
  };
};
