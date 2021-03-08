export const initialState = {
  // Page Name
  page: 'search',
  // A list of the terms to find in the application name, ESA section, or extracted tables
  // (an empty list has no filter)
  searches: null,
  // A list of the application names to include (an empty list has no filter)
  applicationNames: null,
  // A list of the provinces to include (an empty list has no filter)
  regions: null,
  // The earliest filing date to include (an empty list has no filter)
  startDate: null,
  // The latest filing date to include (an empty list has no filter)
  endDate: null,
  // A list of the commodities to include (an empty list has no filter)
  commodities: null,
  // A list of the application types to include (an empty list has no filter)
  projectTypes: null,
  // A list of the pipeline statuses to include (an empty list has no filter)
  statuses: null,
  // The content type to sort the results by
  sort: null,
  // The maximum number of content items to return (a negative number will return all contents)
  first: null,
  // The number of content items to skip (a negative number will skip zero)
  offset: null,
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
    case 'searches/changed':
      if (!action.payload || (action.payload === initialState.searches)) {
        return initialState;
      }
      return {
        ...state,
        searches: action.payload,
      };
    case 'applicationNames/changed':
      if (!action.payload || (action.payload === initialState.applicationNames)) {
        return initialState;
      }
      return {
        ...state,
        applicationNames: action.payload,
      };

    case 'regions/changed':
      if (!action.payload || (action.payload === initialState.regions)) {
        return initialState;
      }
      return {
        ...state,
        regions: action.payload,
      };
    case 'startDate/changed':
      if (!action.payload || (action.payload === initialState.startDate)) {
        return initialState;
      }
      return {
        ...state,
        startDate: action.payload,
      };
    case 'endDate/changed':
      if (!action.payload || (action.payload === initialState.endDate)) {
        return initialState;
      }
      return {
        ...state,
        endDate: action.payload,
      };
    case 'commodities/changed':
      if (!action.payload || (action.payload === initialState.commodities)) {
        return initialState;
      }
      return {
        ...state,
        commodities: action.payload,
      };
    case 'projectTypes/changed':
      if (!action.payload || (action.payload === initialState.projectTypes)) {
        return initialState;
      }
      return {
        ...state,
        projectTypes: action.payload,
      };
    case 'statuses/changed':
      if (!action.payload || (action.payload === initialState.statuses)) {
        return initialState;
      }
      return {
        ...state,
        statuses: action.payload,
      };
    case 'sort/changed':
      if (!action.payload || (action.payload === initialState.sort)) {
        return initialState;
      }
      return {
        ...state,
        sort: action.payload,
      };
    case 'first/changed':
      if (!action.payload || (action.payload === initialState.first)) {
        return initialState;
      }
      return {
        ...state,
        first: action.payload,
      };
    case 'offset/changed':
      if (!action.payload || (action.payload === initialState.offset)) {
        return initialState;
      }
      return {
        ...state,
        offset: action.payload,
      };
    default:
      return state;
  }
};
