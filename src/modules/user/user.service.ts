import { User } from "./user.model.ts";
import { type User as UserType, type UserCreate } from "./user.type.ts";

const createUser = async (userData: UserCreate): Promise<UserType> => {
    const user = await User.create({
        ...userData
    });

    return user;
}

const getAllUsers = async (): Promise<UserType[]> => {
    const users = await User.find().lean();
    return users;
}

const getUser = async (id: string): Promise<UserType | null> => {
    const user = await User.findById(id).lean();
    return user;
}

const deleteUser = async (id: string): Promise<UserType | null> => {
    const user = await User.findByIdAndDelete(id).lean();
    return user;
}

export {createUser, getUser, getAllUsers, deleteUser};