import { Schema, model } from "mongoose";
import type { OrderItem, Order as OrderType } from "./order.type.ts";

const itemSchema = new Schema<OrderItem>(
	{
		productId: {
			type: Schema.Types.ObjectId,
			ref: "Product",
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			default: 1,
		},
		unitPrice: {
			type: Number,
			required: true,
		},
	},
	{
		_id: false,
	},
);

const orderSchema = new Schema<OrderType>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: [itemSchema],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: 'pending'
    }
},
{
    timestamps: true,
});

export const Order = model<OrderType>("Order", orderSchema);