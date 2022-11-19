import express from "express"

import { errorHandler } from "./../middleware/errorHandler"
import { createBookingRequest, deleteBookingRequest, getBookingByIdRequest, getBookingsRequest, updateBookingRequest } from "./../controllers/bookingController"

// setting up the express router
export const bookingRoute = express.Router()

bookingRoute.post('/', errorHandler(createBookingRequest))
bookingRoute.put('/:id', errorHandler(updateBookingRequest))
bookingRoute.delete('/:id', errorHandler(deleteBookingRequest))
bookingRoute.get('/:id', errorHandler(getBookingByIdRequest))
bookingRoute.get('/', errorHandler(getBookingsRequest))
