import { model, Schema } from "mongoose";
import { type User as UserType } from "./user.type.ts";

const userSchema = new Schema<UserType>(
	{
		name: {
			type: String,
			required: true,
			minLength: 2,
			maxLength: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		age: {
			type: Number,
			required: true,
			min: 18,
			max: 120,
		},
		role: {
			type: String,
            required: true,
			enum: ["user", "admin"],
            default: "user",
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
        timestamps: true,
    },
);

export const User = model<UserType>("User", userSchema);
