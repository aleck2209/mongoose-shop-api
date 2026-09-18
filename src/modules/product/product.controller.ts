import { createProduct, getAllProducts, getProduct, deleteProduct } from "./product.service.ts";
import type { Product, ProductCreate } from "./product.type.ts";
import { type Request, type Response } from "express";

const createProductController = async (req: Request, res: Response) => {
    const request: ProductCreate = req.body;
    const product = await createProduct(request);
    res.status(201).json(product);
};

const getAllProductsController = async (_req: Request, res: Response) => {
    const products: Product[] = await getAllProducts();
    res.status(200).json(products);
};

const getProductController = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const id = req.params.id;

    const product = await getProduct(id);
    if (product === null) {
        res.status(404).json({
            message: "Product not found",
        });
        return;
    }

    res.status(200).json(product);
};

const deleteProductController = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const id = req.params.id;

    const product = await deleteProduct(id);
    if (product === null) {
        res.status(404).json({
            message: "Product not found",
        });
        return;
    }

    res.status(204).send();
};

export {
    getProductController,
    createProductController,
    getAllProductsController,
    deleteProductController,
};
