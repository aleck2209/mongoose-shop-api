import type { Product as ProductType, ProductCreate } from "./product.type.ts";
import { Product } from "./product.model.ts";

const createProduct = async (
	productData: ProductCreate,
): Promise<ProductType> => {
	const product = await Product.create({
		...productData,
	});

	return product;
};

const getAllProducts = async (): Promise<ProductType[]> => {
	const products = await Product.find().lean();

	return products;
};

const getProduct = async (productId: string): Promise<ProductType | null> => {
	const product = await Product.findById(productId).lean();

	return product;
};

const deleteProduct = async (
	productId: string,
): Promise<ProductType | null> => {
	const productDeleted = await Product.findByIdAndDelete(productId).lean();

	return productDeleted;
};

export { createProduct, getAllProducts, getProduct, deleteProduct };
