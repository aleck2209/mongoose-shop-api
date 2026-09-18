import type {
	OrderCreate,
	Order as OrderType,
	OrderItem,
	OrderStatus,
} from "./order.type.ts";
import { User } from "../user/user.model.ts";
import { Product } from "../product/product.model.ts";
import { Order } from "./order.model.ts";
import AppError from "../../middlewares/app-error.middleware.ts";

const createOrder = async (orderData: OrderCreate): Promise<OrderType> => {
	const user = await User.findById(orderData.user).lean();

	if (!user) {
		throw new AppError(404, "User not found");
	}

	let totalAmount = 0;
	const orderItems: OrderItem[] = [];

	for (const item of orderData.items) {
		const product = await Product.findById(item.productId).lean();

		if (!product) {
			throw new AppError(404, `Product not found`);
		}

		if (!product.isActive) {
			throw new AppError(400, `Product ${product.name} is inactive`);
		}

		if (product.stock < item.quantity) {
			throw new AppError(400, `Insufficient stock for ${product.name}`);
		}

		const unitPrice = product.price;

		orderItems.push({
			productId: product._id,
			quantity: item.quantity,
			unitPrice,
		});

		totalAmount += unitPrice * item.quantity;
	}

	const order = await Order.create({
		user: user._id,
		items: orderItems,
		totalAmount,
	});

	return order;
};

const getAllOrders = async (): Promise<OrderType[]> => {
	return await Order.find()
		.populate("user", "name")
		.populate("items.productId", "name category")
		.lean();
};

const getOrder = async (orderId: string): Promise<OrderType | null> => {
	return await Order.findById(orderId)
		.populate("user", "name")
		.populate("items.productId","name, category")
		.lean();
};

const deleteOrder = async (orderId: string): Promise<OrderType | null> => {
	return await Order.findByIdAndDelete(orderId).lean();
};

const updateOrderStatus = async (
	orderId: string,
	newStatus: OrderStatus,
): Promise<OrderType> => {
	const order = await Order.findById(orderId);
	if (!order) {
		throw new AppError(404, `Order not found`);
	}

	const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
		pending: ["confirmed", "cancelled"],
		confirmed: ["shipped", "cancelled"],
		shipped: ["delivered"],
		delivered: [],
		cancelled: [],
	};

	if (!allowedTransitions[order.status].includes(newStatus)) {
		throw new AppError(
			400,
			`Cannot change status from ${order.status} to ${newStatus}`,
		);
	}

	order.status = newStatus;
	await order.save();
	return order;
};

export { createOrder, getAllOrders, getOrder, deleteOrder, updateOrderStatus };
