import dotenv from "dotenv"
import express from "express"
import { createServer } from 'http'
import { createBookingForRoute, createBookingForDuration, createBookingWithHotSwap } from './util/createBooking'
import { getAvailableCars, getDistance } from '../../bucket-charge/Backend/src/services/'
import axios from 'axios';

// import routes
// initialize configuration
dotenv.config()

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = 6060;

const app = express()

const httpServer = createServer(app)

httpServer.listen(
	{ port },
	(): void => {
		// tslint:disable-next-line:no-console
		console.log(`\n🚀 	Server started at http://localhost:${port}`);
		generateUserBehaviour();
	})

 const generateUserBehaviour = () => {

	initializeStations();

	var data = '';

	var config: any = {
		method: 'get',
		url: 'http://localhost:8080/api/station',
		headers: { },
		data : data
	};

	axios(config)
	.then(function (response) {
		console.log(response.data);
	})
	.catch(function (error) {
		console.log(error);
	});

	setTimeout(() => {
		firstScenario();
	}, 4000);
	
	setTimeout(() => {
		secondScenario();
	}, 4000);
	
	setTimeout(() => {
		thirdScenario();
	}, 4000);
 }


const initializeStations = () => {
	var id_tmp = "";
	createNewStation("SixtStation", 1, 33.807127, -118.145908, id_tmp);
	createNewCar("Audi a4", "sedan", 320, 100, "Parked", 1768742207, id_tmp);
	createNewStation("Charging Station", 2, 33.789405, -118.194677, id_tmp);
	createNewCar("BMW 330i", "sedan", 1000, 500, "Charging", 1768742203, id_tmp);
	createNewStation("Airport", 3, 33.943021, -118.401891, id_tmp);

	createNewStation("SixtStation", 4, 33.930010, -118.394665, id_tmp);
	createNewCar("Audi a1", "sedan", 900, 300, "Parked", 1768742109, id_tmp);
	createNewStation("Charging Station", 5, 33.930427, -118.402315, id_tmp);
	createNewCar("Mercedes a-class", "sedan", 1000, 1000, "Parked", 1768742108, id_tmp);
	createNewStation("SixtStation", 6, 33.772813, -118.193180, id_tmp);
	createNewStation("Charging Station", getRanddomInteger(1, 10), 33.649303, -117.972085, id_tmp);

	createNewStation("SixtStation", 7, 33.978546, -117.461845, id_tmp);
	createNewCar("Mercedes S-class", "sedan", 2000, 300, "Parked", 1768742004, id_tmp);
	createNewStation("Charging Station", 8, 33.993788, -117.524108, id_tmp);
	createNewCar("Audi a8", "sedan", 2000, 2000, "Parked", 1768742011, id_tmp);
	createNewStation("SixtStation", 9, 33.993808, -117.524047, id_tmp);
}

const firstScenario = (startStation: string, endStation: string, startDate: number, endDate: number, carType: string) => {
		createBookingForRoute(startStation, endStation, startDate, endDate, carType);
}

const secondScenario = (startStation: string, distance: number, startDate: number, endDate: number, carType: string) => {
		createBookingForDuration(startStation, distance, startDate, endDate, carType);
}

const thirdScenario = (startStation: string, endStation: string, startDate: number, endDate: number, carType: string) => {
		createBookingWithHotSwap(startStation, endStation, startDate, endDate, carType);
}

 const createNewStation = (stationType: string, chargingSlots: number, positionLat: number, positionLong: number
	, id_tmp: string) => {
	var data = {
		"stationType": stationType,
		"chargingSlots": chargingSlots,
		"positionLat": positionLat,
		"positionLong": positionLong
	};

	var config: any = {
		method: 'post',
		url: 'http://localhost:8080/api/station',
		headers: { 
			'Content-Type': 'application/json'
		},
		data : data
	};

	axios(config)
	.then(function (response) {
		console.log(response.data);
		const { _id } = response.data;
		id_tmp = _id;
	})
	.catch(function (error) {
		console.log(error);
	});
 }

 const getNewStationById = (stationId: string) => {
	var data = {
		"stationId": stationId
	  };
	  
	  var config: any = {
		method: 'get',
		url: 'http://localhost:8080/api/station/348750795453235405',
		headers: { 
		  'Content-Type': 'application/json'
		},
		data : data
	  };
	  
	  axios(config)
	  .then(function (response) {
		console.log(response.data);
	  })
	  .catch(function (error) {
		console.log(error);
	  });
 }

 function getRanddomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
} 

const createNewCar = (name: string, carType: string, maximumRange: number, currentRange: number,
	carMode: string, lastTimeParked: number, stationId: string) => {
	var data = {
		"name": "Ford F150 Lightning",
		"carType": "Truck",
		"maximumRange": 300,
		"currentRange": 100,
		"carMode": "Moving",
		"lastTimeParked": 1668632156,
		"stationId": "348766306358526158"
	  };
	  
	  var config: any = {
		method: 'post',
		url: 'http://localhost:8080/api/car',
		headers: { 
		  'Content-Type': 'application/json'
		},
		data : data
	  };
	  
	  axios(config)
	  .then(function (response) {
		console.log(JSON.stringify(response.data));
	  })
	  .catch(function (error) {
		console.log(error);
	  });
}

const getCar = () => {

}