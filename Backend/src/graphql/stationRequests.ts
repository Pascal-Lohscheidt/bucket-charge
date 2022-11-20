import { gql } from 'graphql-request';

export const createStation = gql`
  mutation ($data: StationInput!) {
    createStation(data: $data) {
      _id
      stationType
      positionLat
      positionLong
      chargingSlots
      cars {
        data {
          name
          _id
          carMode
          carType
          lastTimeParked
          currentRange
          maximumRange
        }
        before
        after
      }
    }
  }
`;

export const updateStation = gql`
  mutation ($id: ID!, $data: StationInput!) {
    updateStation(id: $id, data: $data) {
      _id
      stationType
      positionLat
      positionLong
      chargingSlots
      cars {
        data {
          name
          _id
          carMode
          carType
          lastTimeParked
          currentRange
          maximumRange
        }
        before
        after
      }
    }
  }
`;

export const deleteStation = gql`
  mutation ($id: ID!) {
    deleteStation(id: $id) {
      _id
      stationType
      positionLat
      positionLong
      chargingSlots
      cars {
        data {
          name
          _id
          carMode
          carType
          lastTimeParked
          currentRange
          maximumRange
        }
        before
        after
      }
    }
  }
`;

export const findStations = gql`
  query {
    allStations {
      data {
        _id
        stationType
        positionLat
        positionLong
        chargingSlots
        cars {
          data {
            name
            _id
            carMode
            carType
            lastTimeParked
            currentRange
            maximumRange
            parkedAt {
              positionLat
              positionLong
            }
          }
          before
          after
        }
      }
    }
  }
`;

export const findStationById = gql`
  query ($id: ID!) {
    findStationByID(id: $id) {
      _id
      stationType
      positionLat
      positionLong
      chargingSlots
      cars {
        data {
          name
          _id
          carMode
          carType
          lastTimeParked
          currentRange
          maximumRange
          parkedAt {
            positionLat
            positionLong
          }
        }
        before
        after
      }
    }
  }
`;
