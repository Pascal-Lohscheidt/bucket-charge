import dotenv from "dotenv"
import express from "express"
import { createServer } from 'http'

// import routes
import { indexRoute } from "./routes/indexRoute"
import { userRoute } from "./routes/userRoute"
import { allowCrossDomain } from "./middleware/crossDomainMiddleware"
import { bookingRoute } from "./routes/bookingRoute"
import { carRoute } from "./routes/carRoute"
import { stationRoute } from "./routes/stationRoute"
import { offerForDurationRoute } from "./routes/offerForDurationRoute"
import { offerForRouteRoute } from "./routes/offerForRouteRoute"
import { offerHotswapRoute } from "./routes/offerHotswapRoute"

// initialize configuration
dotenv.config()

// port is now available to the Node.js runtime
// as if it were an environment variable
const port = process.env.SERVER_PORT

const app = express()


// Add the body parsers middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(allowCrossDomain)

// use the routes
app.use('/', indexRoute)
app.use('/api/user', userRoute)
app.use('/api/booking', bookingRoute)
app.use('/api/car', carRoute)
app.use('/api/station', stationRoute)
app.use('/api/offer/duration', offerForDurationRoute)
app.use('/api/offer/route', offerForRouteRoute)
app.use('/api/offer/hotswap', offerHotswapRoute)

const httpServer = createServer(app)

httpServer.listen(
	{ port },
	(): void => {
		// tslint:disable-next-line:no-console
		console.log(`\nš 	Server started at http://localhost:${port}`)
	})