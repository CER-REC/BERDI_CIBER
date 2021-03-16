import gql from 'graphql-tag';

export const CONFIGURATION = gql`
  query {
    configuration {
      applicationNames
      maxFilingDate
      minFilingDate
      regions
      translations {
        group
        key
        english
        french
      }
    }
  }
`;

export const APPLICATIONS = gql`
  query {
  applications(searches: [], applicationNames: [], regions: [], startDate: "1990-01-01", endDate: "2100-12-31", commodities: [], projectTypes: [], statuses: []) {
    name
    shortName
    companyName
    consultants
    commodity
    regdocsURL
    status
    type
    filingDate
    hearingOrder
    tableCount
    figureCount
    url
  }
}
`;

export const CONTENT_SEARCH = gql`
query {
  contentSearch(searches: [], applicationNames: [], regions: [], startDate: "1990-01-01", endDate: "2100-12-31", commodities: [], projectTypes: [], statuses: [], sort: FIGURE, first: 5, offset: 5) {
  contents {
    title
    esaSections
    pageNumber
    pdfURL
    pdfName
    type
    url
    application {
      name
      consultants
      filingDate
    }
  }
  totalCount
  }
}
`;
export const NULL_QUERY = gql`{ _ }`;
