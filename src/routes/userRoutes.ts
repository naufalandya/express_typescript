import express, {Router} from 'express';
import {getAllUsers, getUserById, createUsers, updateUserById, deleteUserById} from '../controllers/userController'

const userRouter : Router = express.Router();

userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUsers)

userRouter
    .route('/:id')
    .get(getUserById)
    .patch(updateUserById)
    .delete(deleteUserById)

export default userRouter;
