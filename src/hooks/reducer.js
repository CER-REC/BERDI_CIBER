export const initialState = {
  page: 'search',
};

export const getReducer = () => (state, action) => {
  switch (action.type) {
    case 'page/changed':
      if (!action.payload || (action.payload === initialState.page)) {
        return initialState;
      }
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

