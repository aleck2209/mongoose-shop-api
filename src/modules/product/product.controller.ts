import {
	createProduct,
	getAllProducts,
	getProduct,
	deleteProduct,
} from "./product.service.ts";
import type { Product, ProductCreate } from "./product.type.ts";
import { type Request, type Response } from "express";

const createProductController = async (req: Request, res: Response) => {
	const request: ProductCreate = req.body;
	const product = await createProduct(request);
	res.status(201).json(product);
};

const getAllProductsController = async (req: Request, res: Response) => {
	const search =
		typeof req.query.search === "string" ? req.query.search : undefined;
	const category =
		typeof req.query.category === "string" ? req.query.category : undefined;
	const page = req.query.page ? Number(req.query.page) : 1;
	const limit = req.query.limit ? Number(req.query.limit) : 10;

    if (!Number.isInteger(page) || !Number.isInteger(limit) || page <= 0 || limit <= 0) {
        res.status(400).json({
            message: "Bad Request"
        })
        return;
    }

	const products = await getAllProducts(search, category, page, limit);
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
