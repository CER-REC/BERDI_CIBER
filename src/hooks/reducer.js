const getValidEnums = (enums, validEnums) => {
  if (!enums) {
    return validEnums;
  }

  return validEnums.filter((validEnum) => enums?.includes(validEnum));
};

export const initialState = {
  // Page Name
  page: 'search',
  // A list of the terms to find in the application name, ESA section, or extracted tables
  searches: [],
  // A list of the application names to include
  applicationNames: null,
  // A list of the provinces to include
  regions: null,
  // The earliest filing date to include
  startDate: null,
  // The latest filing date to include
  endDate: null,
  // A list of the commodities to include
  commodities: null,
  // A list of the application types to include
  projectTypes: null,
  // A list of the pipeline statuses to include
  statuses: null,
  // The content type to sort the results by
  sort: null,
  // The page of the search results (starting at 0)
  searchIndex: 0,
};

export const getReducer = (
  applicationNames,
  regions,
  minDate,
  maxDate,
  commodities,
  projectTypes,
  statuses,
  defaultContentType,
) => (state, action) => {
  switch (action.type) {
    case 'page/changed':
      return {
        ...state,
        page: action.payload || initialState.page,
        searches: state.searches || initialState.searches,
        applicationNames: state.applicationNames || applicationNames,
        regions: state.regions || regions,
        startDate: state.startDate || minDate,
        endDate: state.endDate || maxDate,
        commodities: state.commodities || commodities,
        projectTypes: state.projectTypes || projectTypes,
        statuses: state.statuses || statuses,
        sort: state.sort || defaultContentType,
        searchIndex: state.searches || initialState.searchIndex,
      };
    case 'searches/changed':
      return {
        ...state,
        page: 'search',
        searches: action.payload || initialState.searches,
        searchIndex: 0,
      };
    case 'applicationNames/changed':
      return {
        ...state,
        applicationNames: getValidEnums(action.payload, applicationNames),
        searchIndex: 0,
      };

    case 'regions/changed':
      return {
        ...state,
        regions: getValidEnums(action.payload, regions),
        searchIndex: 0,
      };
    case 'startDate/changed':
      return {
        ...state,
        startDate: action.payload || minDate,
        searchIndex: 0,
      };
    case 'endDate/changed':
      return {
        ...state,
        endDate: action.payload || maxDate,
        searchIndex: 0,
      };
    case 'commodities/changed':
      return {
        ...state,
        commodities: getValidEnums(action.payload, commodities),
        searchIndex: 0,
      };
    case 'projectTypes/changed':
      return {
        ...state,
        projectTypes: getValidEnums(action.payload, projectTypes),
        searchIndex: 0,
      };
    case 'statuses/changed':
      return {
        ...state,
        statuses: getValidEnums(action.payload, statuses),
        searchIndex: 0,
      };
    case 'sort/changed':
      return {
        ...state,
        sort: action.payload || defaultContentType,
        searchIndex: 0,
      };
    case 'searchIndex/changed':
      return {
        ...state,
        searchIndex: action.payload || initialState.searchIndex,
      };
    default:
      return state;
  }
};
