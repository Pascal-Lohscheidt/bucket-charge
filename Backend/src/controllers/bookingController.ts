import { Request, Response } from 'express';
import { createFaunaClient } from '../graphql/faunaLib';
import {
	createBooking,
	updateBooking,
	deleteBooking,
	findBookingById,
	findBookings,
} from '../graphql/BookingRequests';

export async function createBookingRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: 'Bad Request',
			message: 'The request body is empty',
		});

	try {
		const body = req.body;
		const client = createFaunaClient('eu');
		const booking = await client.request(createBooking, {
			data: {
				startDate: body.startDate,
				endDate: body.endDate,
				distance: body.distance,
				car: {
					connect: body.car,
				},
				startPosition: {
					lat: body.startPosition.lat,
					long: body.startPosition.long,
				},
				incentiveUsed: body.incentiveUsed,
			},
		});

		return res.status(201).json(booking);
	} catch (err) {
		return res.status(500).json({
			error: 'Internal server error',
			message: err.message,
		});
	}
}

export async function updateBookingRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: 'Bad Request',
			message: 'The request body is empty',
		});

	try {
		const bookingId = req.params.id;
		const body = req.body;
		const client = createFaunaClient('eu');
		const booking = await client.request(updateBooking, {
			id: bookingId,
			data: {
				startDate: body.startDate,
				endDate: body.endDate,
				distance: body.distance,
				car: {
					connect: body.car,
				},
				startPosition: {
					lat: body.startPosition.lat,
					long: body.startPosition.long,
				},
				incentiveUsed: body.incentiveUsed,
			},
		});

		return res.status(200).json(booking);
	} catch (err) {
		return res.status(500).json({
			error: 'Internal server error',
			message: err.message,
		});
	}
}

export async function deleteBookingRequest(req: Request, res: Response) {
	try {
		const bookingId = req.params.id;
		const client = createFaunaClient('eu');
		await client.request(deleteBooking, {
			id: bookingId,
		});

		return res.status(204).json(true);
	} catch (err) {
		return res.status(500).json({
			error: 'Internal server error',
			message: err.message,
		});
	}
}

export async function getBookingByIdRequest(req: Request, res: Response) {
	try {
		const bookingId = req.params.id;
		const client = createFaunaClient('eu');
		const booking = await client.request(findBookingById, {
			id: bookingId,
		});

		return res.status(200).json(booking);
	} catch (err) {
		return res.status(500).json({
			error: 'Internal server error',
			message: err.message,
		});
	}
}

export async function getBookingsRequest(req: Request, res: Response) {
	try {
		const client = createFaunaClient('eu');
		const bookings = await client.request(findBookings);

		return res.status(200).json(bookings);
	} catch (err) {
		return res.status(500).json({
			error: 'Internal server error',
			message: err.message,
		});
	}
}
