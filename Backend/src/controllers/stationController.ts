import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { createStation, updateStation, deleteStation, findStationById, findStations } from "../graphql/StationRequests"

export async function createStationRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const body = req.body
		const client = createFaunaClient("eu")
		const station = await client.request(createStation, {
			data: {
				stationType: body.stationType,
				chargingSlots: body.chargingSlots,
				positionLat: body.positionLat,
				positionLong: body.positionLong
			}
		})

		return res.status(201).json(station)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function updateStationRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const stationId = req.params.id
		const body = req.body
		const client = createFaunaClient("eu")
		const station = await client.request(updateStation, {
			id: stationId,
			data: {
				stationType: body.stationType,
				chargingSlots: body.chargingSlots,
				positionLat: body.positionLat,
				positionLong: body.positionLong
			}
		})

		return res.status(200).json(station)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function deleteStationRequest(req: Request, res: Response) {
	try {
		const stationId = req.params.id
		const client = createFaunaClient("eu")
		const station = await client.request(deleteStation, {
			id: stationId
		})

		return res.status(204).json(true)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function getStationByIdRequest(req: Request, res: Response) {
	try {
		const stationId = req.params.id
		const client = createFaunaClient("eu")
		const station = await client.request(findStationById, {
			id: stationId
		})

		return res.status(200).json(station)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function getStationsRequest(req: Request, res: Response) {
	try {
		const client = createFaunaClient("eu")
		const stations = await client.request(findStations)

		return res.status(200).json(stations)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}
