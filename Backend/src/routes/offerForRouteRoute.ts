import express from "express"

import { errorHandler } from "../middleware/errorHandler"
import { listOfferForRouteRequest } from "./../controllers/OfferForRouteController"

// setting up the express router
export const offerForRouteRoute = express.Router()

offerForRouteRoute.get('/', errorHandler(listOfferForRouteRequest))
