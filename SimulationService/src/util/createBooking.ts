import axios from 'axios';

export const createBookingForRoute = (
  startLat: string,
  startLong: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  var data = {
    startLat: startLat,
    startLong: startLong,
    endStation: endStation,
    startDate: startDate,
    endDate: endDate,
    carType: carType,
  };

  const config: any = {
    method: 'get',
    url: 'http://localhost:8080/api/offer/hotswap',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      const { carId, lowBatCarId } = response.data;
      submitBooking(
        carId,
        lowBatCarId,
        startDate,
        endDate,
        { lat: startLat, long: startLong },
        endStation
      );
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const createBookingForDuration = (
  startStation: string,
  distance: number,
  startDate: number,
  endDate: number,
  carType: string
) => {
  var data = {
    startStation: startStation,
    distance: distance,
    startDate: startDate,
    endDate: endDate,
    carType: carType,
  };

  var config: any = {
    method: 'get',
    url: 'http://localhost:8080/api/Offers/ListOffersForDuration',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      const { _id } = response.data;
      submitBooking(_id, startStation, null);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const createBookingWithHotSwap = (
  startStation: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  var data = {
    startStation: startStation,
    endStation: endStation,
    startDate: startDate,
    endDate: endDate,
    carType: carType,
  };

  var config: any = {
    method: 'get',
    url: 'http://localhost:8080/api/offer/hotswap',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
      const { _id } = response.data;
      submitBooking(_id, startStation, endStation);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const submitBooking = (
  carId: string,
  lowBatCarId: string,
  startDate: number,
  endDate: number,
  startPosition: any,
  endStationId: string
) => {
  var data = {
    startDate,
    endDate,
    distance: 50.5,
    car: carId,
    incentiveUsed: lowBatCarId !== '',
    startPosition: {
      lat: startPosition.lat,
      long: startPosition.long,
    },
    stationId: endStationId,
  };

  var config: any = {
    method: 'post',
    url: 'http://localhost:8080/api/Bookings/CreateBooking',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};
