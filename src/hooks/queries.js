import gql from 'graphql-tag';

export const CONFIGURATION = gql`
  query {
    configuration {
      applicationNames
      applicationTypes
      commondities
      contentTypes
      maxFilingDate
      minFilingDate
      statuses
      regions
    }
  }
`;

export const APPLICATIONS = gql`
  query {
    applications {
      name
      shortName
      companyName
      consultants
      status
      type
      filingDate
      hearingOrder
      tableCount
      figureCount
      csvCount
      zippedURL
    }
  }
`;

export const NULL_QUERY = gql`{ _ }`;
