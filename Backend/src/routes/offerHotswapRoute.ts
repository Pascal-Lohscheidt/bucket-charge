import express from "express"
import { listOfferHotswapRequest } from "../controllers/offerHowswapController"

import { errorHandler } from "../middleware/errorHandler"

// setting up the express router
export const offerHotswapRoute = express.Router()

offerHotswapRoute.get('/', errorHandler(listOfferHotswapRequest))
