const getValidEnums = (enums, validEnums) => {
  if (!enums) {
    return [];
  }

  return validEnums.filter((validEnum) => enums?.includes(validEnum));
};

export const initialState = {
  // Page Name
  page: 'landing',
  // A list of the terms to find in the application name, ESA section, or extracted tables
  searches: [],
  // A list of the application IDs to include
  applicationIds: [],
  // A list of the provinces to include
  regions: [],
  // The earliest filing date to include
  startDate: null,
  // The latest filing date to include
  endDate: null,
  // A list of the commodities to include
  commodities: [],
  // A list of the application types to include
  projectTypes: [],
  // A list of the pipeline statuses to include
  statuses: [],
  // A list of the content types to include
  contentTypes: [],
  // A list of the selected application IDs in the treemap
  treemapApplicationIds: [],
  // The page of the search results (starting at 0)
  searchIndex: 0,
  // The URL fragment
  fragment: '',
};

export const getReducer = (
  applicationIds,
  regions,
  minDate,
  maxDate,
  commodities,
  projectTypes,
  statuses,
  contentTypes,
) => (state, action) => {
  switch (action.type) {
    case 'changed':
      return {
        ...state,
        page: action.payload.page || initialState.page,
        searches: action.payload.searches || initialState.searches,
        applicationIds: getValidEnums(action.payload.applicationIds, applicationIds),
        regions: getValidEnums(action.payload.regions, regions),
        startDate: action.payload.startDate || minDate,
        endDate: action.payload.endDate || maxDate,
        commodities: getValidEnums(action.payload.commodities, commodities),
        projectTypes: getValidEnums(action.payload.projectTypes, projectTypes),
        statuses: getValidEnums(action.payload.statuses, statuses),
        contentTypes: getValidEnums(action.payload.contentTypes, contentTypes),
        treemapApplicationIds: getValidEnums(action.payload.treemapApplicationIds, applicationIds),
        searchIndex: action.payload.searchIndex || initialState.searchIndex,
        fragment: action.payload.fragment || initialState.fragment,
      };
    case 'page/changed':
      return {
        ...state,
        page: action.payload || initialState.page,
        searches: state.searches || initialState.searches,
        applicationIds: state.applicationIds || initialState.applicationIds,
        regions: state.regions || initialState.regions,
        startDate: state.startDate || minDate,
        endDate: state.endDate || maxDate,
        commodities: state.commodities || initialState.commodities,
        projectTypes: state.projectTypes || initialState.projectTypes,
        statuses: state.statuses || initialState.statuses,
        contentTypes: state.contentTypes || initialState.contentTypes,
        treemapApplicationIds: state.treemapApplicationIds || initialState.treemapApplicationIds,
        searchIndex: state.searchIndex || initialState.searchIndex,
        fragment: initialState.fragment,
      };
    case 'searches/changed':
      return {
        ...state,
        page: 'search',
        searches: action.payload || initialState.searches,
        searchIndex: 0,
        fragment: initialState.fragment,
      };
    case 'applicationIds/changed':
      return {
        ...state,
        applicationIds: getValidEnums(action.payload, applicationIds),
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
    case 'contentTypes/changed':
      return {
        ...state,
        contentTypes: getValidEnums(action.payload, contentTypes),
        searchIndex: 0,
      };
    case 'searchIndex/changed':
      return {
        ...state,
        searchIndex: action.payload || initialState.searchIndex,
      };
    case 'page/fragment/changed':
      return {
        ...state,
        page: action.payload.page || state.page,
        fragment: action.payload.fragment || state.fragment,
      };
    case 'treemapApplicationIds/added':
      return {
        ...state,
        treemapApplicationIds: [...new Set(state.treemapApplicationIds.concat(action.payload))],
      };
    case 'treemapApplicationIds/removed':
      return {
        ...state,
        treemapApplicationIds: state.treemapApplicationIds.filter((id) => id !== action.payload),
      };
    case 'filters/removed':
      return {
        ...state,
        applicationIds: initialState.applicationIds,
        regions: initialState.regions,
        startDate: minDate,
        endDate: maxDate,
        commodities: initialState.commodities,
        projectTypes: initialState.projectTypes,
        statuses: initialState.statuses,
        contentTypes: initialState.contentTypes,
        treemapApplicationIds: initialState.treemapApplicationIds,
        searchIndex: initialState.searchIndex,
      };
    default:
      return state;
  }
};
