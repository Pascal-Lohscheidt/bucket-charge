import { Request, Response } from "express"
import { getAvailableCars } from "../services/getAvailableCarsService"

export async function listOfferForDurationRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const body = req.body
		const locatedCars = await getAvailableCars(body.carType, body.startDate, body.endDate, body.startStation)

		// Filter cars with too little charge (+ 20 km buffer) left
		const buffer = 20
		const locatedCarsEnoughCharge = locatedCars.filter(c => c.currentRange >= (body.distance + buffer)).sort((c1, c2) => c1.curentRange < c2.curentRange)

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