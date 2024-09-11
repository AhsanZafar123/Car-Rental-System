import {
   createOne,
   getAll,
   getOne,
   updateOne,
   deleteOne,
} from '../handleFactory.js'
import db from '../../config/db.js'
import catchAsync from '../../utils/catchAsync.js'

// POST create new User Address
// Route  /userAddress
export const createUserAddress = createOne('user_address')

// GET all users
// Route /api/users
export const getUserAddress = getAll('user_address')

// GET user by id
// Route /api/user/:id
export const getUserAddressById = getOne('user_address')

// DELETE user by id
// Route /api/user/:id
export const deleteUserAddressById = deleteOne('user_address')

// UPDATE user by id
// Route /api/user/:id
export const updateUserAddressById = updateOne('user_address')

//Routes //api/users/addresses/all/

export const getUserAddressJoin = catchAsync(async (req, res, next) => {
   const userAddresses = await db('user_address as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id')
      .select('*')

   const addressesWithoutSensitiveData = userAddresses.map(
      ({ password, passwordResetToken, passwordResetExpires, ...rest }) => rest
   )

   res.status(200).json({
      status: 'success',
      doc: {
         userAddresses: addressesWithoutSensitiveData,
      },
   })
})

// GET user address by id with associated user details
// Route /api/users/addresses/all/:id
export const getUserAddressByIdJoin = catchAsync(async (req, res, next) => {
   const { id } = req.params;

   const userAddress = await db('user_address as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id') // Join with users table
      .select(
         'ua.id', // Assuming 'id' is the primary key in userAddress
         'ua.address',
         'ua.city',
         'ua.zipCode',
         'ua.state',
         'u.id as userId',
         'u.email',
         'u.name',
         'u.phoneNumber',
         'u.status',
         'u.registrationDate',
         'u.image',
         'u.cnic',
         'u.role',
         'u.passwordChangedAt'
      )
      .where('ua.id', id) // Assuming 'id' is the primary key in userAddress
      .first();

   if (!userAddress) {
      return next(new AppError('No user address found with that ID', 404));
   }

   res.status(200).json({
      status: 'success',
      doc: {
         userAddress,
      },
   });
});

//Routes //api/users/addresses/with-cards

export const getUserAddressWithCards = catchAsync(async (req, res, next) => {
   const userAddresses = await db('user_address as ua')
      .leftJoin('users as u', 'ua.userId', 'u.id') // Join with users
      .leftJoin('cards as c', 'u.id', 'c.userId') // Join with cards
      .select('*') // Select all fields from the joined tables

   // Remove any sensitive fields (e.g., password, CVV)
   const addressesWithoutSensitiveData = userAddresses.map(
      ({ password, passwordResetToken, passwordResetExpires, cvv, ...rest }) =>
         rest
   )

   res.status(200).json({
      status: 'success',
      doc: {
         userAddresses: addressesWithoutSensitiveData,
      },
   })
})
