import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";

// Create a new Car Type
export const createCarType = createOne ('carTypes')
export const getCarTypes = getAll ('carTypes')
export const getCarTypeById = getOne ('carTypes')
export const updateCarTypeById = updateOne ('carTypes')
export const deleteCarTypeById = deleteOne ('carTypes')