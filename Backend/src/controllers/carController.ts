import { Request, Response } from 'express';
import { createFaunaClient } from '../graphql/faunaLib';
import {
  createCar,
  updateCar,
  deleteCar,
  findCarById,
  findCars,
} from '../graphql/CarRequests';

export async function createCarRequest(req: Request, res: Response) {
  // Check if body is empty
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  try {
    const body = req.body;
    const client = createFaunaClient('eu');
    const car = await client.request(createCar, {
      data: {
        name: body.name,
        carType: body.carType,
        maximumRange: body.maximumRange,
        currentRange: body.currentRange,
        carMode: body.carMode,
        lastTimeParked: body.lastTimeParked,
        parkedAt: {
          connect: body.stationId,
        },
      },
    });

    return res.status(201).json(car);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}

export async function updateCarRequest(req: Request, res: Response) {
  // Check if body is empty
  if (Object.keys(req.body).length === 0)
    return res.status(400).json({
      error: 'Bad Request',
      message: 'The request body is empty',
    });

  try {
    const carId = req.params.id;
    const body = req.body;
    const client = createFaunaClient('eu');
    const car = await client.request(updateCar, {
      id: carId,
      data: {
        name: body.name,
        carType: body.carType,
        maximumRange: body.maximumRange,
        currentRange: body.currentRange,
        carMode: body.carMode,
        lastTimeParked: body.lastTimeParked,
      },
    });

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}

export async function deleteCarRequest(req: Request, res: Response) {
  try {
    const carId = req.params.id;
    const client = createFaunaClient('eu');
    const car = await client.request(deleteCar, {
      id: carId,
    });

    return res.status(204).json(true);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}

export async function getCarByIdRequest(req: Request, res: Response) {
  try {
    const carId = req.params.id;
    const client = createFaunaClient('eu');
    const car = await client.request(findCarById, {
      id: carId,
    });

    return res.status(200).json(car);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}

export async function getCarsRequest(req: Request, res: Response) {
  try {
    const client = createFaunaClient('eu');
    const cars = await client.request(findCars);

    return res.status(200).json(cars);
  } catch (err) {
    return res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  }
}
