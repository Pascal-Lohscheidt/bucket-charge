import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { findCars } from "../graphql/CarRequests"
import { Car, CarType } from "../models/car"
import { findBookings } from "../graphql/BookingRequests"
import { start } from "repl"

export async function listOfferForDurationRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const body = req.body
        const startDate = body.startDate
        const endDate = body.endDate
		const client = createFaunaClient("eu")

		const allCars = (await client.request(findCars)).allCars.data ?? []

        // Get all carIds for cars with correct type
        let cars = allCars.filter(c => String(c.carType) === body.carType)
        
        const allBookings = (await client.request(findBookings)).allBookings.data ?? []
        const carBookings = allBookings.filter(b => cars.some(c => c._id === b.car._id))
        // find allBookings during the desired time slot
        const filteredCarBookings = carBookings.filter(b => !((b.endDate < startDate) || (b.startDate > endDate)))
        // these cars need to be excluded as they are not available during the desired timeslot
        const availableCars = cars.filter(c => !filteredCarBookings.some(b => b.car._id === c._id))

        // Check if the cars are available in the desired startStation
        const locatedCars = availableCars.filter(c => {
            const carBookings = allBookings.filter(b => b.car._id === c._id && b.endDate < startDate).sort((b1, b2) => b1.endDate > b2.endDate)

            if (carBookings.lenght === 0) {
                return false
            } 

            const lastPosition = carBookings.at(0).endStation
            return lastPosition._id === body.startStation
        })

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