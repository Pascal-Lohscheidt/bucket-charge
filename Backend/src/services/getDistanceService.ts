import axios from "axios"

export async function getDistance(startLat: string, startLong: string, endLat: string, endLong: string) {

	const { data }: any = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLong}&destination=${endLat},${endLong}&units=metric&key=AIzaSyCylOoTb8pEjHGRPhUK2BNIfyxAOzf2cK8`)

	const distanceInMeters = data.routes[0].legs[0].distance.value
	return distanceInMeters / 1000
}