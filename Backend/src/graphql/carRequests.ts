import { gql } from 'graphql-request';

export const createCar = gql`
  mutation($data: CarInput!) {
    createCar(data: $data) {
        carMode,
        name,
        carType,
        _id,
        lastTimeParked,
        parkedAt {
            _id,
            stationType,
            positionLong,
            positionLat
        }
        currentRange,
        maximumRange
    }
}
`;

export const updateCar = gql`
  mutation($id: ID!, $data: CarInput!) {
    updateCar(id: $id, data: $data) {
        carMode,
        name,
        carType,
        _id,
        lastTimeParked,
        parkedAt {
            _id,
            stationType,
            positionLong,
            positionLat
        }
        currentRange,
        maximumRange
    }
}
`;

export const deleteCar = gql`
  mutation($id: ID!) {
    deleteCar(id: $id) {
        carMode,
        name,
        carType,
        _id,
        lastTimeParked,
        parkedAt {
            _id,
            stationType,
            positionLong,
            positionLat
        }
        currentRange,
        maximumRange
    }
}
`;

export const findCars = gql`
  query {
    allCars {
        data {
            carMode,
            name,
            carType,
            _id,
            lastTimeParked,
            parkedAt {
                _id,
                stationType,
                positionLong,
                positionLat
            }
            currentRange,
            maximumRange
        }
    }
}
`;

export const findCarsById = gql`
  query($id: ID!) {
    findCarByID(id: $id) {
        carMode,
        name,
        carType,
        _id,
        lastTimeParked,
        parkedAt {
            _id,
            stationType,
            positionLong,
            positionLat
        }
        currentRange,
        maximumRange
    }
}
`;