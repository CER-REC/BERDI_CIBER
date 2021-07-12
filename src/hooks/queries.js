import gql from 'graphql-tag';

export const CONFIGURATION = gql`
  query {
    configuration {
      maxFilingDate
      minFilingDate
      regions
      fileSize
      fileDownloadURL
      tableCount
      csvCount
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
    discovery0:content(id: 13025) {
      id
      title
      esaSections
      pdfPageNumber
      pdfURL
      type
      url
    }
    discovery1:content(id: 16713) {
      id
      title
      esaSections
      pdfPageNumber
      pdfURL
      type
      url
    }
    discovery2:content(id: 1376) {
      id
      title
      esaSections
      pdfPageNumber
      pdfURL
      type
      url
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
    $searchApplicationIds: [String!]!,
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
      id
      name
      shortName
      companyName
      commodity
      applicationURL
      consultants
      status
      type
      filingDate
      hearingOrder
      tableCount(searches: $searches)
      figureCount(searches: $searches)
      url
      finalDecisionURL
    }
    contentSearch(
      searches: $searches,
      applicationIds: $searchApplicationIds,
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
        pdfPageNumber
        pdfPageCount
        pdfURL
        pdfName
        type
        url
        esaFolderURL
        application {
          name
          consultants
          filingDate
          companyName
        }
      }
      totalCount
    }
}
`;
