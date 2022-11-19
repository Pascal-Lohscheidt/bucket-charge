import axios from 'axios';

export const createNewStation = async (
  stationType: string,
  chargingSlots: number,
  positionLat: number,
  positionLong: number
) => {
  var data = {
    stationType: stationType,
    chargingSlots: chargingSlots,
    positionLat: positionLat,
    positionLong: positionLong,
  };

  var config: any = {
    method: 'post',
    url: 'http://localhost:8080/api/station',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    const response: any = await axios(config);
    const { _id } = response.data.createStation;
    console.log('Sucessful Station Creation of', _id);
    return _id;
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createNewCar = async (
  name: string,
  carType: string,
  maximumRange: number,
  currentRange: number,
  carMode: string,
  lastTimeParked: number,
  stationId: string
) => {
  var data = {
    name,
    carType,
    maximumRange,
    currentRange,
    carMode,
    lastTimeParked,
    stationId,
  };

  var config: any = {
    method: 'post',
    url: 'http://localhost:8080/api/car',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };

  try {
    await axios(config);
    console.log('Sucessful Car Creation');
  } catch (error) {
    console.log(error);
  }
};
