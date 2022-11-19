import dotenv from "dotenv"
import express from "express"
import { createServer } from 'http'
import { createBookingForRoute, createBookingForDuration } from './util/createBooking'

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
	setTimeout(() => {
		createBookingForRoute(75, 30, 15, 20, 1668818607, 1668828607, "Truck", true);
	}, 2000);

	setTimeout(() => {
		createBookingForDuration(75, 30, 1668818607, 1668828607, "Truck");
	}, 4000);
 }