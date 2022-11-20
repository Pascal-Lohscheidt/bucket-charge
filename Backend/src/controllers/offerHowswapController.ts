import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { findCars } from "../graphql/CarRequests"
import { findStationById } from "../graphql/stationRequests"
import { Offer } from "../models/offer"
import { createOffersWithoutHotswap } from "../services/offerService"

export async function listOfferHotswapRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const offers: Offer[] = [];
		const client = createFaunaClient("eu")
		const body = req.body
		const start = (await client.request(findStationById, {
			id: body.startStation
		})).findStationByID
		const end = (await client.request(findStationById, {
			id: body.endStation
		})).findStationByID

		if (start === null || start === undefined || end === null || end === undefined) {
			return res.status(404).json(false)
		}

		const allCars = (await client.request(findCars)).allCars.data ?? []

		// Get all carIds for cars with correct type
		const cars = allCars.filter(c => String(c.carType) === body.carType)

		// Look for car in x km around booking startPosition with low battery (currentRange / maximumRange)
		const lowBattery = 0.4
		const carsLowBattery = cars.filter(c => (c.currentRange / c.maximumRange) <= lowBattery)
		const deviation = 0.02 // around 2km
		const carsLowBatteryInArea = carsLowBattery.filter(c => Math.sqrt(Math.pow(c.parkedAt.positionLat - start.positionLat, 2) + Math.pow(c.parkedAt.positionLong - start.positionLong, 2)) <= deviation)

		// create offers with hotswap for all carsLowBatteryInArea

		// add car to waypoint

		// find the nearest car at nearby charging stations that fullfills bucket strategy

		// add this car to waypoint

		// Iterate throught waypoints and swap cars on right waypoint

		// create offers without hotswap
		const offersNoHotSwap = await createOffersWithoutHotswap(body.carType, body.startDate, body.endDate, body.startStation, start.positionLat, start.positionLong, end.positionLat, end.positionLong)
		for (var offer of offersNoHotSwap) {
			offers.push(offer)
		}

		if (offers.length === 0) {
			return res.status(201).json(true)
		}

		// Return all offers
		return res.status(201).json(offers)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}