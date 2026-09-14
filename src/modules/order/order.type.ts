import type { Types } from "mongoose";

type OrderStatus =
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";

export type OrderItem = {
    productId: Types.ObjectId;
    quantity: number;
    unitPrice: number;
};

export type Order = {
    user: Types.ObjectId;
    items: OrderItem[];
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    updatedAt: Date;
};

export type OrderItemCreate = {
    productId: string;
    quantity: number;
};

export type OrderCreate = {
    user: string;
    items: OrderItemCreate[];
};