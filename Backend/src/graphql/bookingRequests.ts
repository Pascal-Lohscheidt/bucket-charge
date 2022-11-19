import { gql } from 'graphql-request'

export const createBooking = gql`
  mutation($data: BookingInput!) {
    createBooking(data: $data) {
        _id,
        startDate,
        endDate,
        distance,
        car {
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
            maximumRange,
        },
        startStation {
                _id,
                stationType,
                positionLat,
                positionLong,
                chargingSlots
            },
        endStation {
            _id,
            stationType,
            positionLat,
            positionLong,
            chargingSlots
        },
    }
}
`

export const updateBooking = gql`
  mutation($id: ID!, $data: BookingInput!) {
    updateBooking(id: $id, data: $data) {
        _id,
        startDate,
        endDate,
        distance,
        car {
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
        },
        startStation {
                _id,
                stationType,
                positionLat,
                positionLong,
                chargingSlots
            },
        endStation {
            _id,
            stationType,
            positionLat,
            positionLong,
            chargingSlots
        },
    }
}
`

export const deleteBooking = gql`
  mutation($id: ID!) {
    deleteBooking(id: $id) {
        _id,
        startDate,
        endDate,
        distance,
        car {
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
        },
        startStation {
                _id,
                stationType,
                positionLat,
                positionLong,
                chargingSlots
            },
        endStation {
            _id,
            stationType,
            positionLat,
            positionLong,
            chargingSlots
        },
    }
}
`

export const findBookings = gql`
  query{
    allBookings {
        data {
            _id,
            startDate,
            endDate,
            distance,
            car {
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
            },
            startStation {
                _id,
                stationType,
                positionLat,
                positionLong,
                chargingSlots
            },
        endStation {
            _id,
            stationType,
            positionLat,
            positionLong,
            chargingSlots
        },
        }
    }
}
`

export const findBookingById = gql`
  query($id: ID!) {
    findBookingByID(id: $id) {
        _id,
        startDate,
        endDate,
        distance,
        car {
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
        },
        startStation {
                _id,
                stationType,
                positionLat,
                positionLong,
                chargingSlots
            },
        endStation {
            _id,
            stationType,
            positionLat,
            positionLong,
            chargingSlots
        },
    }
}
`
