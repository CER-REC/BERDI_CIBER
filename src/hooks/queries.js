import gql from 'graphql-tag';

export const CONFIGURATION = gql`
  query {
    configuration {
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
    applications {
      id
      shortName
    }
  }
`;

export const SEARCH = gql`
  query(
    $searches: [String!]!,
    $applicationIds: [String!]!,
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
      applicationIds: $applicationIds,
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
      applicationIds: $applicationIds,
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
