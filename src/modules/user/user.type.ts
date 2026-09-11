type UserRole = 'admin' | 'user';

export type User = {
    name: string;
    email: string;
    age: number;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type UserCreate = {
    name: string;
    email: string;
    age: number;
}