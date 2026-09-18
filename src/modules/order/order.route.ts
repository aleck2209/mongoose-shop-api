import { Router } from "express";
import {
	createOrderController as createOrder,
	getAllOrdersController as getAllOrders,
	getOrderController as getOrder,
	deleteOrderController as deleteOrder,
} from "./order.controller.ts";

const orderRoutes = Router();

orderRoutes.post('/', createOrder);
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', getOrder);
orderRoutes.delete('/:id', deleteOrder);

export default orderRoutes;