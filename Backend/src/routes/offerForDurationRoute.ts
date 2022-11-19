import express from "express"

import { errorHandler } from "../middleware/errorHandler"
import { listOfferForDurationRequest } from "../controllers/OfferForDurationController"

// setting up the express router
export const offerForDurationRoute = express.Router()

offerForDurationRoute.get('/', errorHandler(listOfferForDurationRequest))
