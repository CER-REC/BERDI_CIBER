import gql from 'graphql-tag';

export const CONFIGURATION = gql`
  query {
    configuration {
      applicationNames
      maxFilingDate
      minFilingDate
      regions
      keywords {
        key
        count
      }
      translations {
        group
        key
        english
        french
      }
    }
  }
`;

export const SEARCH = gql`
  query(
    $searches: [String!]!,
    $applicationNames: [String!]!,
    $regions: [Region!]!,
    $startDate: DateTime!,
    $endDate: DateTime!,
    $commodities: [Commodity!]!,
    $projectTypes: [ProjectType!]!,
    $statuses: [Status!]!,
    $contentTypes: [MediaType!]!,
    $first: Int!,
    $offset: Int!
  ) {
    applications(
      searches: $searches,
      applicationNames: $applicationNames,
      regions: $regions,
      startDate: $startDate,
      endDate: $endDate,
      commodities: $commodities,
      projectTypes: $projectTypes,
      statuses: $statuses
    ) {
      name
      shortName
      companyName
      commodity
      regdocsURL
      consultants
      status
      type
      filingDate
      hearingOrder
      tableCount(searches: $searches)
      figureCount(searches: $searches)
      url
    }
    contentSearch(
      searches: $searches,
      applicationNames: $applicationNames,
      regions: $regions,
      startDate: $startDate,
      endDate: $endDate,
      commodities: $commodities,
      projectTypes: $projectTypes,
      statuses: $statuses,
      mediaTypes: $contentTypes,
      first: $first,
      offset: $offset
    ) {
      contents {
        id
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
