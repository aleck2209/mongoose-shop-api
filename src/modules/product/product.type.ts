export type Product = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductCreate = {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
}

export type ProductListResult = {
    products: Product[],
    productCount: number,
    totalPage: number
}