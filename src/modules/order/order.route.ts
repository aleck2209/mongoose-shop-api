import { Router } from "express";
import {
	createOrderController as createOrder,
	getAllOrdersController as getAllOrders,
	getOrderController as getOrder,
	deleteOrderController as deleteOrder,
	updateOrderStatusController as updateOrderStatus
} from "./order.controller.ts";
import isValidId from "../../middlewares/valid-id.middleware.ts";

const orderRoutes = Router();

orderRoutes.post('/', createOrder);
orderRoutes.get('/', getAllOrders);
orderRoutes.get('/:id', isValidId, getOrder);
orderRoutes.delete('/:id', isValidId, deleteOrder);
orderRoutes.patch('/:id/status', isValidId, updateOrderStatus);

export default orderRoutes;