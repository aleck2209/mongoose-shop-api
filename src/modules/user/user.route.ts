import { Router } from "express";
import { getUserController, getAllUsersController, deleteUserController, createUserController } from "./user.controller.ts";
import isValidId from "../../middlewares/valid-id.middleware.ts";

const userRoutes = Router();

userRoutes.post('/', createUserController);
userRoutes.get('/', getAllUsersController);
userRoutes.get('/:id', isValidId, getUserController);
userRoutes.delete('/:id', isValidId, deleteUserController);

export default userRoutes;
