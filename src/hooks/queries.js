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
    $search: String,
    $applicationIds: [String!]!,
    $regions: [Region!]!,
    $startDate: DateTime!,
    $endDate: DateTime!,
    $commodities: [Commodity!]!,
    $projectTypes: [ProjectType!]!,
    $statuses: [Status!]!,
    $contentTypes: [MediaType!]!,
    $searchApplicationIds: [String!]!,
    $valueComponent: InputValueComponentType,
    $first: Int!,
    $offset: Int!
  ) {
    applications(
      search: $search,
      applicationIds: $applicationIds,
      regions: $regions,
      startDate: $startDate,
      endDate: $endDate,
      commodities: $commodities,
      projectTypes: $projectTypes,
      statuses: $statuses,
      valueComponent: $valueComponent
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
      tableCount(search: $search, valueComponent: $valueComponent)
      figureCount(search: $search, valueComponent: $valueComponent)
      url
      finalDecisionURL
    }
    contentSearch(
      search: $search,
      applicationIds: $searchApplicationIds,
      regions: $regions,
      startDate: $startDate,
      endDate: $endDate,
      commodities: $commodities,
      projectTypes: $projectTypes,
      statuses: $statuses,
      mediaTypes: $contentTypes,
      valueComponent: $valueComponent,
      first: $first,
      offset: $offset
    ) {
      contents {
        id
        title
        esaSections
        pdfPageNumber
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
          status
          type
          commodity
          hearingOrder
          applicationURL
          finalDecisionURL
        }
      }
      totalCount
      downloadTableIds
      valueComponent {
        landscape
        soil
        wetland
        water
        fish
        plant
        wildlife
        species
        noise
        gas
        air
        electricity
        infrastructure
        job
        environmental
        heritage
        proximity
        human
        social
        boat
        indigenous
        treaty
      }
    }
  }
`;

export const DOWNLOAD_SIZE = gql`
  query($ids: [ID!]!) {
    download(ids: $ids) {
      fileSize
    }
  }
`;

export const CART_ITEMS = gql`
  query($cartIds: [ID!]!) {
    contents(ids: $cartIds) {
      id
      title
      application {
        name
        companyName
      }
    }
  }
`;
