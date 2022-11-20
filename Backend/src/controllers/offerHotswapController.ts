import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { findCars } from "../graphql/CarRequests"
import { findStationById, findStations } from "../graphql/stationRequests"
import { Offer } from "../models/offer"
import { createOffersWithoutHotswap } from "../services/offerService"
import { getDistance } from "../services/getDistanceService"

export async function listOfferHotswapRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const offers: Offer[] = []
		const client = createFaunaClient("eu")
		const body = req.body
		const start = { positionLat: body.startLat, positionLong: body.startLong }
		const end = (
			await client.request(findStationById, {
				id: body.endStation,
			})
		).findStationByID

		if (!end) {
			return res.status(404).json(false)
		}
		const allCars = (await client.request(findCars)).allCars.data ?? []
		// Get all carIds for cars with correct type
		const cars = allCars.filter((c) => String(c.carType) === body.carType)

		// Look for car in x km around booking startPosition with low battery (currentRange / maximumRange)
		const lowBattery = 0.4
		const carsLowBattery = cars.filter(
			(c) => c.currentRange / c.maximumRange <= lowBattery
		)

		const deviation = 0.02 // around 2km
		const carsLowBatteryInArea: any[] = carsLowBattery.filter(
			(c) =>
				Math.sqrt(
					Math.pow(c.parkedAt.positionLat - start.positionLat, 2) +
					Math.pow(c.parkedAt.positionLong - start.positionLong, 2)
				) <= deviation
		)

		// Search for charging station until found with fille station
		const allStations: any = (await client.request(findStations)).allStations
			.data

		const viableStations = await allStations
			.filter((s) => s.cars.data.length > 0)
			.filter((s) => s.stationType === "ChargingStation")
			.filter(async (s) =>
				s.cars.data.some(
					async (c) =>
						c.currentRange >=
						(await getDistance(
							s.positionLat,
							s.positionLong,
							end.positionLat,
							end.positionLong
						)) +
						20
				)
			)

		const incentiveOffers = []
		// create offers with hotswap for all carsLowBatteryInArea
		if (carsLowBatteryInArea.length > 0) {
			for (const car of carsLowBatteryInArea) {
				const chargingStationsInArea = viableStations.filter(
					(s) =>
						Math.sqrt(
							Math.pow(car.parkedAt.positionLat - s.positionLat, 2) +
							Math.pow(car.parkedAt.positionLong - s.positionLong, 2)
						) <= 0.1
				)

				const viableCars = await chargingStationsInArea
					.map((s) => s.cars.data)
					.flatMap((arr) => arr)
					.filter(
						async (c) =>
							c.currentRange >=
							(await getDistance(
								c.parkedAt.positionLat,
								c.parkedAt.positionLong,
								end.positionLat,
								end.positionLong
							)) +
							20
					)
				// get required distance

				viableCars
					.sort((c1, c2) => c1.currentRange - c2.currentRange)
					.forEach((viableCar) => {
						incentiveOffers.push({
							lowBatCarId: car._id,
							carId: viableCar._id,
						})
					})
			}
		}

		const filledCars = await allStations
			.filter(
				(s) =>
					Math.sqrt(
						Math.pow(start.positionLat - s.positionLat, 2) +
						Math.pow(start.positionLong - s.positionLong, 2)
					) <= 0.1
			)
			.map((s) => s.cars.data)
			.flatMap((arr) => arr)
			.filter(
				async (c) =>
					c.currentRange >=
					(await getDistance(
						c.parkedAt.positionLat,
						c.parkedAt.positionLong,
						end.positionLat,
						end.positionLong
					)) +
					20
			)
			.sort((c1, c2) => c1.currentRange - c2.currentRange)

		for (const car of filledCars) {
			offers.push({
				lowBatCarId: "",
				carId: car._id,
			})
		}

		if (offers.length === 0 && incentiveOffers.length === 0) {
			return res.status(200).json({ offers: [] })
		}

		// Return all offers
		return res.status(200).json({ offers: [...offers, ...incentiveOffers] })
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}
