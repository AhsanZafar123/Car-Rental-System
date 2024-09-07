import {
	createOne,
	getAll,
	getOne,
	deleteOne,
	updateOne,
} from "./handleFactory.js";
// Create a new Car 
export const createCar = createOne ('cars')
export const getCars = getAll ('cars')
export const getCarbyId =getOne ('cars')
export const deleteCarById = updateOne ('cars')
export const updateCarById = deleteOne ('cars')