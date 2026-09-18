import type { Request, Response } from "express";
import type { OrderCreate } from "./order.type.ts";
import {
	createOrder,
	getOrder,
	getAllOrders,
	deleteOrder,
} from "./order.service.ts";

const createOrderController = async (req: Request, res: Response) => {
	const orderData: OrderCreate = req.body;
	const order = await createOrder(orderData);
	res.status(201).json(order);
};

const getAllOrdersController = async (_req: Request, res: Response) => {
	const orders = await getAllOrders();

	res.status(200).json(orders);
};

const getOrderController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	const id = req.params.id;

	const order = await getOrder(id);
	if (order === null) {
		res.status(404).json({
			message: "Order not found",
		});
		return;
	}

	res.status(200).json(order);
};

const deleteOrderController = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	const id = req.params.id;

	const order = await deleteOrder(id);
	if (order === null) {
		res.status(404).json({
			message: "Order not found",
		});
		return;
	}

	res.status(204).send();
};

export {
	createOrderController,
	getAllOrdersController,
	getOrderController,
	deleteOrderController,
};
