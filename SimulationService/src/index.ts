import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import {
  createBookingForRoute,
  createBookingForDuration,
  createBookingWithHotSwap,
} from './util/createBooking';
import axios from 'axios';
import {
  createNewCar,
  createNewStation,
} from './util/intializeSimulationStateHelper';

// import routes
// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = 6060;

const app = express();

const httpServer = createServer(app);

httpServer.listen({ port }, (): void => {
  // tslint:disable-next-line:no-console
  console.log(`\n🚀 	Server started at http://localhost:${port}`);
  generateUserBehaviour();
});

const generateUserBehaviour = async () => {
  // await initializeStations();

  var data = '';
  /*
  setTimeout(() => {
    firstScenario();
  }, 4000);

  setTimeout(() => {
    secondScenario();
  }, 4000);

  setTimeout(() => {
    thirdScenario();
  }, 4000);*/
};

const initializeStations = async () => {
  const firstStation = await createNewStation(
    'SixtStation',
    1,
    33.807127,
    -118.145908
  );
  const airportStation = await createNewStation(
    'Other',
    3,
    33.943021,
    -118.401891
  ); // Airport

  const secondStation = await createNewStation(
    'SixtStation',
    6,
    33.772813,
    -118.19318
  );
  const firstChargeStation = await createNewStation(
    'ChargingStation',
    getRanddomInteger(1, 10),
    33.649303,
    -117.972085
  );

  const secondChargeStation = await createNewStation(
    'ChargingStation',
    8,
    33.993788,
    -117.524108
  );

  const thirdStation = await createNewStation(
    'SixtStation',
    7,
    33.978546,
    -117.461845
  );

  const thirdChargeStation = await createNewStation(
    'ChargingStation',
    2,
    33.789405,
    -118.194677
  );

  const fourthChargeStation = await createNewStation(
    'ChargingStation',
    5,
    33.930427,
    -118.402315
  );

  const fourthStation = await createNewStation(
    'SixtStation',
    9,
    33.993808,
    -117.524047
  );

  const fithStation = await createNewStation(
    'SixtStation',
    4,
    33.93001,
    -118.394665
  );

  await createNewCar(
    'BMW 330i',
    'Sedan',
    1000,
    500,
    'Charging',
    1768742203,
    firstChargeStation
  );

  await createNewCar(
    'Audi a1',
    'Sedan',
    900,
    300,
    'Parked',
    1768742109,
    airportStation
  );

  await createNewCar(
    'Audi a4',
    'Sedan',
    320,
    100,
    'Parked',
    1768742207,
    firstChargeStation
  );

  await createNewCar(
    'Mercedes a-class',
    'Sedan',
    1000,
    1000,
    'Parked',
    1768742108,
    airportStation
  );

  await createNewCar(
    'Mercedes S-class',
    'Sedan',
    2000,
    300,
    'Parked',
    1768742004,
    airportStation
  );

  await createNewCar(
    'Audi a8',
    'Sedan',
    2000,
    2000,
    'Parked',
    1768742011,
    airportStation
  );
};

const firstScenario = (
  startStation: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingForRoute(startStation, endStation, startDate, endDate, carType);
};

const secondScenario = (
  startStation: string,
  distance: number,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingForDuration(startStation, distance, startDate, endDate, carType);
};

const thirdScenario = (
  startStation: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingWithHotSwap(
    startStation,
    endStation,
    startDate,
    endDate,
    carType
  );
};

const getNewStationById = (stationId: string) => {
  var data = {
    stationId: stationId,
  };

  var config: any = {
    method: 'get',
    url: 'http://localhost:8080/api/station/348750795453235405',
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

function getRanddomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const getCar = () => {};
