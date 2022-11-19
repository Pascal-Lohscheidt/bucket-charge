import { Request, Response } from "express"
import { createFaunaClient } from "../graphql/faunaLib"
import { createUser, updateUser, deleteUser, findUsers, findUserById } from "../graphql/UserRequests"

export async function createUserRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const body = req.body
		const client = createFaunaClient("eu")
		const user = await client.request(createUser, {
			data: {
				name: body.name
			}
		})

		return res.status(201).json(user)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function updateUserRequest(req: Request, res: Response) {
	// Check if body is empty
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({
			error: "Bad Request",
			message: "The request body is empty",
		})

	try {
		const userId = req.params.id
		const body = req.body
		const client = createFaunaClient("eu")
		const user = await client.request(updateUser, {
			id: userId,
			data: {
				name: body.name
			}
		})

		return res.status(200).json(user)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function deleteUserRequest(req: Request, res: Response) {
	try {
		const userId = req.params.id
		const client = createFaunaClient("eu")
		const user = await client.request(deleteUser, {
			id: userId
		})

		return res.status(204).json(true)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function getUserByIdRequest(req: Request, res: Response) {
	try {
		const userId = req.params.id
		const client = createFaunaClient("eu")
		const user = await client.request(findUserById, {
			id: userId
		})

		return res.status(200).json(user)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}

export async function getUsersRequest(req: Request, res: Response) {
	try {
		const client = createFaunaClient("eu")
		const users = await client.request(findUsers)

		return res.status(200).json(users)
	} catch (err) {
		return res.status(500).json({
			error: "Internal server error",
			message: err.message,
		})
	}
}
