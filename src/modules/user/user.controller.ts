import { type Request, type Response } from "express";
import {
	createUser,
	getAllUsers,
	getUser,
	deleteUser,
} from "./user.service.ts";
import type { User, UserCreate } from "./user.type.ts";
import mongoose from "mongoose";

const createUserController = async (req: Request, res: Response) => {
	const request: UserCreate = req.body;
	const user = await createUser(request);
	res.status(201).json(user);
};

const getAllUsersController = async (req: Request, res: Response) => {
	const users: User[] = await getAllUsers();
	res.status(200).json(users);
};

const getUserController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	const id = req.params.id;
	const user = await getUser(id);

	if (user === null) {
		res.status(404).json({
			message: "User not found",
		});
		return;
	}

	res.status(200).json(user);
};

const deleteUserController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	const id = req.params.id;
	const user = await deleteUser(id);

	if (user === null) {
		res.status(404).json({
			message: "User not found",
		});
		return;
	}

	res.status(204).send();
};

export {
	getUserController,
	createUserController,
	getAllUsersController,
	deleteUserController,
};
