import { GraphQLClient, gql } from 'graphql-request';

export const createFaunaClient = (region: 'eu' | 'us') =>
  new GraphQLClient(`https://graphql.${region}.fauna.com/graphql`, {
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_KEY}`,
    },
  });

// Examples

export const createSymbolSearchEntry = gql`
  mutation createSymbolEntry($data: SymbolSearchQueryEntryInput!) {
    createSymbolSearchQueryEntry(data: $data) {
      _id
    }
  }
`;

export const getAllSymbolSearchEntries = gql`
  query allSymbolSearchQueryEntries {
    allSymbolSearchQueryEntrys(_size: 100000) {
      data {
        searchQuery
        lastUpdated
        results {
          symbol
          exchange
          name
          matchOrder
        }
      }
    }
  }
`;

export const createDividendCollection = gql`
  mutation createDividendCollection($data: DividendCollectionInput!) {
    createDividendCollection(data: $data) {
      _id
      stockId
    }
  }
`;

export const addDividendDataToCollection = gql`
  mutation addDividendsToCollection($id: ID!, $dividends: [DividendDataInput]) {
    addDividendsToCollection(id: $id, dividends: $dividends) {
      _id
      dividends {
        data {
          payment_date
          _id
        }
      }
    }
  }
`;

export const updateDividendCollection = gql`
  mutation updateDividendCollection($id: ID!, $data: DividendCollectionInput!) {
    updateDividendCollection(id: $id, data: $data) {
      _id
      stockId
    }
  }
`;

export const getDividendCollections = gql`
  query getAllDividendCollections {
    allDividendCollections(_size: 100000) {
      data {
        stockId
        meta {
          symbol
          exchange
          exchange_timezone
          type
          mic_code
          interval
          currency
        }
        lastPaymentDate
        dividends {
          amount
          payment_date
        }
      }
    }
  }
`;
