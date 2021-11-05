const validTopics = [
  'landscape',
  'soil',
  'wetland',
  'water',
  'fish',
  'plant',
  'wildlife',
  'species',
  'noise',
  'gas',
  'air',
  'electricity',
  'infrastructure',
  'job',
  'environmental',
  'heritage',
  'proximity',
  'human',
  'social',
  'boat',
  'indigenous',
  'treaty',
];

const getValidEnums = (enums, validEnums) => {
  if (!enums) {
    return [];
  }

  return enums.filter((type) => validEnums.includes(type));
};

export const initialState = {
  // Page Name
  page: 'landing',
  search: '',
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
  topics: [],
  filter: 'topic',
  // The page of the search results (starting at 0)
  searchIndex: 0,
  cartIndex: 0,
  // The URL fragment
  fragment: '',
  cartIds: [],
  unreadCartIds: [],
  resultCount: 10,
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
  let ids;

  switch (action.type) {
    case 'changed':
      return {
        ...state,
        page: action.payload.page || initialState.page,
        search: action.payload.search || initialState.search,
        applicationIds: getValidEnums(action.payload.applicationIds, applicationIds),
        regions: getValidEnums(action.payload.regions, regions),
        startDate: action.payload.startDate || minDate,
        endDate: action.payload.endDate || maxDate,
        commodities: getValidEnums(action.payload.commodities, commodities),
        projectTypes: getValidEnums(action.payload.projectTypes, projectTypes),
        statuses: getValidEnums(action.payload.statuses, statuses),
        contentTypes: getValidEnums(action.payload.contentTypes, contentTypes),
        treemapApplicationIds: getValidEnums(action.payload.treemapApplicationIds, applicationIds),
        topics: getValidEnums(action.payload.topics, validTopics) || initialState.topics,
        filter: action.payload.filter || initialState.filter,
        searchIndex: action.payload.searchIndex || initialState.searchIndex,
        cartIndex: action.payload.cartIndex || initialState.cartIndex,
        fragment: action.payload.fragment || initialState.fragment,
        cartIds: action.payload.cartIds || initialState.cartIds,
        unreadCartIds: action.payload.unreadCartIds || initialState.unreadCartIds,
        resultCount: action.payload.resultCount || initialState.resultCount,
      };
    case 'page/changed':
      return {
        ...state,
        page: action.payload || initialState.page,
        search: state.search || initialState.search,
        applicationIds: state.applicationIds || initialState.applicationIds,
        regions: state.regions || initialState.regions,
        startDate: state.startDate || minDate,
        endDate: state.endDate || maxDate,
        commodities: state.commodities || initialState.commodities,
        projectTypes: state.projectTypes || initialState.projectTypes,
        statuses: state.statuses || initialState.statuses,
        contentTypes: state.contentTypes || initialState.contentTypes,
        treemapApplicationIds: state.treemapApplicationIds || initialState.treemapApplicationIds,
        topics: state.topics || initialState.topics,
        filter: state.filter || initialState.filter,
        searchIndex: state.searchIndex || initialState.searchIndex,
        cartIndex: state.cartIndex || initialState.cartIndex,
        fragment: initialState.fragment,
        cartIds: state.cartIds || initialState.cartIds,
        unreadCartIds: state.unreadCartIds || initialState.unreadCartIds,
        resultCount: state.resultCount || initialState.resultCount,
      };
    case 'search/changed':
      return {
        ...state,
        page: 'search',
        search: action.payload || initialState.search,
        searchIndex: 0,
        fragment: initialState.fragment,
      };
    case 'search/removed':
      return {
        ...state,
        page: 'search',
        search: initialState.search,
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
    case 'dateRange/removed':
      return {
        ...state,
        startDate: minDate,
        endDate: maxDate,
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
        searchIndex: 0,
      };
    case 'treemapApplicationIds/removed':
      ids = [].concat(action.payload);

      return {
        ...state,
        treemapApplicationIds: state.treemapApplicationIds.filter((id) => !ids.includes(id)),
        searchIndex: 0,
      };
    case 'topics/added':
      return {
        ...state,
        topics: [...new Set(state.topics.concat(action.payload))],
        filter: 'topic',
        searchIndex: 0,
      };
    case 'topics/removed':
      ids = [].concat(action.payload);

      return {
        ...state,
        topics: state.topics.filter((id) => !ids.includes(id)),
        searchIndex: 0,
      };
    case 'filter/changed':
      return {
        ...state,
        treemapApplicationIds: initialState.treemapApplicationIds,
        filter: action.payload,
        fragment: initialState.fragment,
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
        topics: initialState.topics,
        searchIndex: initialState.searchIndex,
      };
    case 'cartIds/added':
      return {
        ...state,
        cartIndex: 0,
        cartIds: [...new Set(state.cartIds.concat(action.payload))],
        unreadCartIds: [...new Set(state.unreadCartIds.concat(action.payload))],
      };
    case 'cartIds/changed':
      return {
        ...state,
        cartIndex: 0,
        cartIds: action.payload || initialState.cartIds,
        unreadCartIds: action.payload || initialState.unreadCartIds,
      };
    case 'cartIds/removed':
      ids = [].concat(action.payload);

      return {
        ...state,
        cartIndex: 0,
        cartIds: state.cartIds.filter((id) => !ids.includes(id)),
        unreadCartIds: state.unreadCartIds.filter((id) => !ids.includes(id)),
      };
    case 'unreadCartIds/removed':
      return {
        ...state,
        unreadCartIds: initialState.unreadCartIds,
      };
    case 'resultCount/changed':
      return {
        ...state,
        resultCount: action.payload || initialState.resultCount,
        searchIndex: 0,
      };
    default:
      return state;
  }
};
