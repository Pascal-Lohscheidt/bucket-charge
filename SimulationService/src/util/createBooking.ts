import axios from 'axios';

export const createBooking = async (
  startLat: number,
  startLong: number,
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

  const response: any = await axios(config);
  console.log(response.data);

  if (response.data.offers.length > 0) {
    const { carId, lowBatCarId } = response.data.offers[0];
    await submitBooking(
      carId,
      lowBatCarId,
      startDate,
      endDate,
      startLat,
      startLong,
      endStation
    );
  }
};
/*
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
*/
const submitBooking = async (
  carId: string,
  lowBatCarId: string,
  startDate: number,
  endDate: number,
  startLat: number,
  startLong: number,
  endStationId: string
) => {
  const car: any = (
    (await axios.get(`http://localhost:8080/api/car/${carId}`)) as any
  ).data.findCarByID;
  let lowBatCar = undefined;

  if (lowBatCarId !== '') {
    lowBatCar = (
      (await axios.get(`http://localhost:8080/api/car/${lowBatCarId}`)) as any
    ).data.findCarByID;
  }

  var data = {
    startDate,
    endDate,
    distance: 50.5,
    car: carId,
    incentiveUsed: lowBatCarId !== '',
    startPosition: {
      lat: startLat,
      long: startLong,
    },
    stationId: lowBatCar !== '' ? lowBatCar.parkedAt._id : car.parkedAt._id,
  };

  var config: any = {
    method: 'post',
    url: 'http://localhost:8080/api/booking',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  const response: any = await axios(config);

  if (lowBatCarId !== '') {
    config = {
      method: 'put',
      url: `http://localhost:8080/api/booking/${response.data.createBooking._id}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        startDate: 1668732207,
        endDate: 1668818607,
        distance: 50.5,
        car: carId,
        incentiveUsed: true,
        stationId: car.parkedAt._id,
        startPosition: { lat: startLat, long: startLong },
      },
    };
    await axios(config);
  }

  config = {
    method: 'put',
    url: `http://localhost:8080/api/booking/${response.data.createBooking._id}`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      startDate: 1668732207,
      endDate: 1668818607,
      distance: 50.5,
      car: carId,
      incentiveUsed: true,
      stationId: endStationId,
      startPosition: { lat: startLat, long: startLong },
    },
  };
  await axios(config);
};
