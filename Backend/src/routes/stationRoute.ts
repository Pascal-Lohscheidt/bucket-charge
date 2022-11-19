import express from "express"

import { errorHandler } from "./../middleware/errorHandler"
import { createStationRequest, deleteStationRequest, getStationByIdRequest, getStationsRequest, updateStationRequest } from "./../controllers/stationController"

// setting up the express router
export const stationRoute = express.Router()

stationRoute.post('/', errorHandler(createStationRequest))
stationRoute.put('/:id', errorHandler(updateStationRequest))
stationRoute.delete('/:id', errorHandler(deleteStationRequest))
stationRoute.get('/:id', errorHandler(getStationByIdRequest))
stationRoute.get('/', errorHandler(getStationsRequest))
