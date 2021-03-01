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
      url
    }
  }
`;

export const NULL_QUERY = gql`{ _ }`;
