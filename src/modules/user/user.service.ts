import { User } from "./user.model.ts";
import { type User as UserType, type UserCreate } from "./user.type.ts";
import { type ObjectId } from "mongoose";

const createUser = async (userData: UserCreate) => {
    await User.create({
        ...userData
    })
}

const getAllUsers = async (): Promise<UserType[]> => {
    const users = await User.find().lean();
    return users
}

const getUser = async (id: ObjectId): Promise<UserType | null> => {
    const user = await User.findById(id).lean()
    return user;
}

const deleteUser = async (id: ObjectId): Promise<void> => {
    await User.findByIdAndDelete(id)
}

export {createUser, getUser, getAllUsers, deleteUser}