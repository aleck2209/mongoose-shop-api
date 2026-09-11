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
	if (!id) {
		res.status(404).send("HTTP 404 Not Found");
		return;
	}

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: 'Bad Request'
        })
        return;
    } 

	const user = await getUser(id);

	res.status(200).json(user);
};

const deleteUserController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	const id = req.params.id;
	if (!id) {
		res.status(404).send("HTTP 404 Not Found");
		return;
	}

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: 'Bad Request'
        })
        return;
    } 

	await deleteUser(id);

	res.status(204).send();
};

export {
	getUserController,
	createUserController,
	getAllUsersController,
	deleteUserController,
};
