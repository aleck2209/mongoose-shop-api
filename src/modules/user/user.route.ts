import { Router } from "express";
import { getUserController, getAllUsersController, deleteUserController, createUserController } from "./user.controller.ts";

const userRoutes = Router();

userRoutes.post('/', createUserController);
userRoutes.get('/', getAllUsersController);
userRoutes.get('/:id', getUserController);
userRoutes.delete('/:id', deleteUserController);

export default userRoutes;
