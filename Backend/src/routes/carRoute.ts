import express from "express"

import { errorHandler } from "./../middleware/errorHandler"
import { createCarRequest, deleteCarRequest, getCarByIdRequest, getCarsRequest, updateCarRequest } from "./../controllers/carController"

// setting up the express router
export const carRoute = express.Router()

carRoute.post('/', errorHandler(createCarRequest))
carRoute.put('/:id', errorHandler(updateCarRequest))
carRoute.delete('/:id', errorHandler(deleteCarRequest))
carRoute.get('/:id', errorHandler(getCarByIdRequest))
carRoute.get('/', errorHandler(getCarsRequest))
