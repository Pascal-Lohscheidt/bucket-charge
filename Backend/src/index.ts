import dotenv from "dotenv"
import express from "express"
import { createServer } from 'http'

// import routes
import { indexRoute } from "./routes/indexRoute"
import { allowCrossDomain } from "./middleware/crossDomainMiddleware"

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

const httpServer = createServer(app)

httpServer.listen(
	{ port },
	(): void => {
		// tslint:disable-next-line:no-console
		console.log(`\n🚀 	Server started at http://localhost:${port}`)
	})