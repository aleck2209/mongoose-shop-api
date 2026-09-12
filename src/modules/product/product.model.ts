import { Schema, model } from "mongoose";
import type { Product as ProductType } from "./product.type.ts";

const productSchema = new Schema<ProductType>(
	{
		name: {
			type: String,
			minLength: 2,
			maxLength: 100,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0.01,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
		},
		category: {
			type: String,
			required: true,
		},
		isActive: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export const Product = model<ProductType>("Product", productSchema)