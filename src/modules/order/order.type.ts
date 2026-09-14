import type { ObjectId } from "mongoose";

type OrderStatus =
	| "pending"
	| "confirmed"
	| "shipped"
	| "delivered"
	| "cancelled";

export type OrderItem = {
	productId: string | ObjectId;
	quantity: number;
	unitPrice: number;
};

export type OrderItemCreate = {
    productId: string | ObjectId;
    quantity: number;
};

export type Order = {
	user: string | ObjectId;
	items: OrderItem[];
	totalAmount: number;
	status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type OrderCreate = {
    user: string | ObjectId;
	items: OrderItemCreate[];
}
