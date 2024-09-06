import express from 'express';
import { createUser, getUsers, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";
import { createUserAddress, getUserAddress, getUserAddressById, updateUserAddressById, deleteUserAddressById } from "../controllers/userAddressController.js";

const router = express.Router();

// Routes for user management
router.route('/')
    .post(createUser)   // Create a new user
    .get(getUsers);     // Get all users

router.route('/:id')
    .get(getUserById)       // Get user by ID
    .put(updateUserById)    // Update user by ID
    .delete(deleteUserById); // Delete user by ID

    
// Routes for user address management
router.route('/addresses')
    .post(createUserAddress) // Create a new user address
    .get(getUserAddress);    // Get all user addresses

router.route('/addresses/:id')
    .get(getUserAddressById)     // Get user address by ID
    .put(updateUserAddressById)  // Update user address by ID
    .delete(deleteUserAddressById); // Delete user address by ID

export default router;
