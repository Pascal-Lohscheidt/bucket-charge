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
var thirdStation;
var thirdChargeStation;
var fourthChargeStation;
var fourthStation;
var fithStation;

//random stations
var firstRndStation;
var secondRndStation;
var thirdRndStation;
var fourthRndStation;
var fifthRndStation;

const generateUserBehaviour = async () => {
  await initializeStations();

  for (let i = 0; i < 11; i++) {
    setTimeout(() => {
      firstScenario(
        firstStation,
        airportStation,
        1768742103,
        176874304,
        'Sedan'
      );
    }, 4000);

    setTimeout(() => {
      secondScenario(
        fithStation,
        firstChargeStation,
        1768741103,
        176874303,
        'Truck'
      );
    }, 4000);

    setTimeout(() => {
      thirdScenario(
        thirdStation,
        fourthStation,
        1768742203,
        1768744403,
        'Transporter'
      );
    }, 4000);

    setTimeout(() => {
      fourthScenario(
        firstRndStation,
        fifthRndStation,
        1668742203,
        1668752203,
        'Sedan'
      );
    }, 4000);

    setTimeout(() => {
      fifthScenario(
        secondRndStation,
        fourthRndStation,
        1768742203,
        1768742503,
        'Truck'
      );
    }, 4000);

    setTimeout(() => {
      sixthScenario(
        thirdRndStation,
        3000,
        1868742203,
        1868842203,
        'Transporter'
      );
    }, 4000);

    setTimeout(() => {
      seventhScenario(
        fourthChargeStation,
        fourthRndStation,
        1668742203,
        1668742503,
        'Sedan'
      );
    }, 4000);

    setTimeout(() => {
      eighthScenario(
        firstChargeStation,
        fifthRndStation,
        1768742503,
        1768742519,
        'Sedan'
      );
    }, 4000);
  }
};

const initializeStations = async () => {
  firstStation = await createNewStation(
    'SixtStation',
    1,
    33.807127,
    -118.145908
  );
  airportStation = await createNewStation('Other', 3, 33.943021, -118.401891); // Airport

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

  fithStation = await createNewStation('SixtStation', 4, 33.93001, -118.394665);

  firstRndStation = await createNewStation(
    'ChargingStation',
    12,
    33.903374,
    -118.160242
  );

  secondRndStation = await createNewStation(
    'ChargingStation',
    12,
    33.824573,
    -118.342704
  );

  thirdRndStation = await createNewStation(
    'ChargingStation',
    12,
    33.837566,
    -118.382792
  );

  fourthRndStation = await createNewStation(
    'ChargingStation',
    12,
    34.03161,
    -118.473518
  );

  fifthRndStation = await createNewStation(
    'ChargingStation',
    12,
    34.064508,
    -118.394828
  );

  let otherStation = await createNewStation('Other', 2, 34.015199, -118.275793);
  await createNewCar(
    'BMW 330i',
    'Sedan',
    400,
    40,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.974592, -118.333467);
  await createNewCar(
    'Audi Q8',
    'Sedan',
    1000,
    170,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 34.032602, -118.323006);
  await createNewCar(
    'Audi Q5',
    'Sedan',
    700,
    170,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.871660, -118.313460);
  await createNewCar(
    'Bmw X5',
    'Sedan',
    830,
    180,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.850695, -118.260331);
  await createNewCar(
    'Bmw X5',
    'Sedan',
    830,
    280,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 34.381107, -118.531688);
  await createNewCar(
    'Mercedes GLS',
    'Sedan',
    1500,
    280,
    'Charging',
    1768742203,
    otherStation
  );

  await createNewCar(
    'Mercedes GLS',
    'Sedan',
    1500,
    1500,
    'Charging',
    1768742203,
    otherStation
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

  otherStation = await createNewStation('Other', 2, 33.956716, -118.264280);
  await createNewCar(
    'Mercedes GLE',
    'Sedan',
    1500,
    280,
    'Charging',
    1768742203,
    otherStation
  );

  await createNewCar(
    'Audi a1',
    'Sedan',
    900,
    900,
    'Parked',
    1768742109,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.947483, -118.297673);
  await createNewCar(
    'Mercedes GLC',
    'Sedan',
    980,
    280,
    'Charging',
    1768742203,
    otherStation
  );

  await createNewCar(
    'Mercedes GLC',
    'Sedan',
    980,
    730,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.692610, -117.959513);
  await createNewCar(
    'Mercedes GLC',
    'Sedan',
    980,
    500,
    'Charging',
    1768742203,
    otherStation
  );

  otherStation = await createNewStation('Other', 2, 33.753015, -117.920410);
  await createNewCar(
    'Mercedes GLC',
    'Sedan',
    980,
    500,
    'Charging',
    1768742203,
    otherStation
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

  await createNewCar(
    'Tesla Model 3',
    'Sedan',
    4000,
    2700,
    'Parked',
    1768742011,
    firstRndStation
  );

  await createNewCar(
    'Cyber Truck',
    'Truck',
    7000,
    2300,
    'Parked',
    1768742011,
    firstRndStation
  );

  await createNewCar(
    'Bmw i8',
    'Sedan',
    3500,
    2700,
    'Parked',
    1768742011,
    secondRndStation
  );

  await createNewCar(
    'Mercedes c-class',
    'Sedan',
    3500,
    1200,
    'Parked',
    1768742011,
    thirdRndStation
  );

  await createNewCar(
    'Bmw m4',
    'Sedan',
    2700,
    2700,
    'Parked',
    1768742011,
    fourthRndStation
  );

  await createNewCar(
    'Bmw m5',
    'Sedan',
    3100,
    2700,
    'Parked',
    1768742011,
    fifthRndStation
  );
};

const firstScenario = async (
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

const fourthScenario = (
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

const fifthScenario = (
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

const sixthScenario = (
  startStation: string,
  distance: number,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingForDuration(startStation, distance, startDate, endDate, carType);
};

const seventhScenario = (
  startStation: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingForRoute(startStation, endStation, startDate, endDate, carType);
};

const eighthScenario = (
  startStation: string,
  endStation: string,
  startDate: number,
  endDate: number,
  carType: string
) => {
  createBookingForRoute(startStation, endStation, startDate, endDate, carType);
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
