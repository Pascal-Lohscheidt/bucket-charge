import express from "express"

import { errorHandler } from "./../middleware/errorHandler"
import { createUserRequest, deleteUserRequest, getUserByIdRequest, getUsersRequest, updateUserRequest } from "./../controllers/userController"

// setting up the express router
export const userRoute = express.Router()

userRoute.post('/', errorHandler(createUserRequest))
userRoute.put('/:id', errorHandler(updateUserRequest))
userRoute.delete('/:id', errorHandler(deleteUserRequest))
userRoute.get('/:id', errorHandler(getUserByIdRequest))
userRoute.get('/', errorHandler(getUsersRequest))
