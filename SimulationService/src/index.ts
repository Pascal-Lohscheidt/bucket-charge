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

var firstStation;
var airportStation;
var secondStation;
var firstChargeStation;
var secondChargeStation;
var thirdStation
var thirdChargeStation
var fourthChargeStation
var fourthStation
var fithStation

const generateUserBehaviour = async () => {
  await initializeStations();

  
  setTimeout(() => {
    firstScenario(firstStation, airportStation, 1768742103, 176874304, "Sedan");
  }, 4000);

  setTimeout(() => {
    secondScenario(fithStation, firstChargeStation, 1768741103, 176874303, "Truck");
  }, 4000);

  setTimeout(() => {
    thirdScenario(thirdStation, fourthStation, 1768742203, 1768744403, "Transporter");
	}, 4000);
};

const initializeStations = async () => {
  firstStation = await createNewStation(
    'SixtStation',
    1,
    33.807127,
    -118.145908
  );
  airportStation = await createNewStation(
    'Other',
    3,
    33.943021,
    -118.401891
  ); // Airport

  secondStation = await createNewStation(
    'SixtStation',
    6,
    33.772813,
    -118.19318
  );
  firstChargeStation = await createNewStation(
    'ChargingStation',
    11,
    33.649303,
    -117.972085
  );

  secondChargeStation = await createNewStation(
    'ChargingStation',
    8,
    33.993788,
    -117.524108
  );

  thirdStation = await createNewStation(
    'SixtStation',
    7,
    33.978546,
    -117.461845
  );

  thirdChargeStation = await createNewStation(
    'ChargingStation',
    2,
    33.789405,
    -118.194677
  );

  fourthChargeStation = await createNewStation(
    'ChargingStation',
    5,
    33.930427,
    -118.402315
  );

  fourthStation = await createNewStation(
    'SixtStation',
    9,
    33.993808,
    -117.524047
  );

  fithStation = await createNewStation(
    'SixtStation',
    4,
    33.930010,
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
