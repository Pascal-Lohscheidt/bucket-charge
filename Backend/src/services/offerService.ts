import { getAvailableCars } from '../services/getAvailableCarsService'
import { getDistance } from '../services/getDistanceService'
import { Offer } from '../models/offer'

export async function createOffersWithoutHotswap(
	carType: string,
	startDate: number,
	endDate: number,
	startStation: string,
	startLat: string,
	startLong: string,
	endLat: string,
	endLong: string
): Promise<Offer[]> {
	const locatedCars = await getAvailableCars(
		carType,
		startDate,
		endDate,
		startStation
	)
	const distance = await getDistance(startLat, startLong, endLat, endLong)

	// Filter cars with too little charge (+ 20 km buffer) left
	const buffer = 20
	const locatedCarsEnoughCharge = locatedCars
		.filter((c) => c.currentRange >= distance + buffer)
		.sort((c1, c2) => c1.curentRange < c2.curentRange)
	return locatedCarsEnoughCharge.map((c) => {
		return {
			lowBatCarId: '',
			carId: c._id,
		}
	})
}
