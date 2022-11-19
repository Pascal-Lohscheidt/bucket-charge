import express from "express"

import { errorHandler } from "./../middleware/errorHandler"
import { listOfferForDurationRequest } from "./../controllers/OfferDurationController"

// setting up the express router
export const offerDurationRoute = express.Router()

offerDurationRoute.get('/', errorHandler(listOfferForDurationRequest))
