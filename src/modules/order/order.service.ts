import type {
	OrderCreate,
	Order as OrderType,
	OrderItem,
} from "./order.type.ts";
import { User } from "../user/user.model.ts";
import { Product } from "../product/product.model.ts";
import { Order } from "./order.model.ts";

const createOrder = async (orderData: OrderCreate): Promise<OrderType> => {
	const user = await User.findById(orderData.user).lean();

	if (!user) {
		throw new Error("User not found");
	}

	let totalAmount = 0;
	const orderItems: OrderItem[] = [];

	for (const item of orderData.items) {
		const product = await Product.findById(item.productId).lean();

		if (!product) {
			throw new Error(`Product ${item.productId} not found`);
		}

		if (!product.isActive) {
			throw new Error(`Product ${product.name} is inactive`);
		}

		if (product.stock < item.quantity) {
			throw new Error(`Insufficient stock for ${product.name}`);
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
		.populate("user", { select: "name" })
		.populate("items.productId", { select: "name, category" })
		.lean();
};

const getOrder = async (orderId: string): Promise<OrderType | null> => {
	return await Order.findById(orderId)
		.populate("user", { select: "name" })
		.populate("items.productId", { select: "name, category" })
		.lean();
};

const deleteOrder = async (orderId: string): Promise<OrderType | null> => {
	return await Order.findByIdAndDelete(orderId).lean();
};

export { createOrder, getAllOrders, getOrder, deleteOrder };
