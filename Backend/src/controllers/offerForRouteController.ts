import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { getAvailableCars } from "../services/getAvailableCarsService"
import { findStationById } from "../graphql/stationRequests"
import { getDistance } from "../services/getDistanceService"

export async function listOfferForRouteRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const client = createFaunaClient("eu")
		const body = req.body
		const start = (await client.request(findStationById, {
			id: body.startStation
		})).findStationByID
		const end = (await client.request(findStationById, {
			id: body.endStation
		})).findStationByID

		const locatedCars = await getAvailableCars(body.carType, body.startDate, body.endDate, body.startStation)
		const distance = await getDistance(start.positionLat, start.positionLong, end.positionLat, end.positionLong)

		// Filter cars with too little charge (+ 20 km buffer) left
		const buffer = 20
		const locatedCarsEnoughCharge = locatedCars.filter(c => c.currentRange >= (distance + buffer)).sort((c1, c2) => c1.curentRange < c2.curentRange)

		if (locatedCarsEnoughCharge.length === 0) {
			return res.status(201).json(true)
		}

		// Return car with least charge that is still enought
		return res.status(201).json(locatedCarsEnoughCharge.at(0))
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}