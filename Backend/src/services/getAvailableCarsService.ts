import { createFaunaClient } from '../graphql/faunaLib'
import { findCars } from '../graphql/CarRequests'
import { findBookings } from '../graphql/BookingRequests'

export async function getAvailableCars(
	carType: string,
	startDate: number,
	endDate: number,
	startStation: string
) {
	const client = createFaunaClient('eu')

	const allCars = (await client.request(findCars)).allCars.data ?? []

	// Get all carIds for cars with correct type
	const cars = allCars.filter((c) => String(c.carType) === carType)

	const allBookings =
		(await client.request(findBookings)).allBookings.data ?? []
	const carBookings = allBookings.filter((b) =>
		cars.some((c) => c._id === b.car._id)
	)

	// find allBookings during the desired time slot
	const filteredCarBookings = carBookings.filter(
		(b) => !(b.endDate < startDate || b.startDate > endDate)
	)
	// these cars need to be excluded as they are not available during the desired timeslot
	const availableCars = cars.filter(
		(c) => !filteredCarBookings.some((b) => b.car._id === c._id)
	)

	// Check if the cars are available in the desired startStation
	const locatedCars = availableCars.filter(
		(c) => c.parkedAt._id === startStation
	)

	return locatedCars
}
