import type { Product as ProductType, ProductCreate, ProductListResult } from "./product.type.ts";
import { Product } from "./product.model.ts";

const createProduct = async (
	productData: ProductCreate,
): Promise<ProductType> => {
	const product = await Product.create({
		...productData,
	});

	return product;
};

const getAllProducts = async (
	search?: string,
	category?: string,
	page: number = 1,
	limit: number = 10,
): Promise<ProductListResult> => {
	const skip = (page - 1) * limit;

	const filter: Record<string, unknown> = {};
	if (search) {
		filter.name = {
			$regex: search,
			$options: "i",
		};
	}

	if (category) {
		filter.category = category;
	}

	const products = await Product.find(filter)
		.select("name price category")
		.sort({ price: 1 })
		.skip(skip)
		.limit(limit)
		.lean();

	const productCount = await Product.countDocuments(filter);
	const totalPage = Math.ceil(productCount / limit)

	const result = {
		products,
		productCount,
		totalPage
	}

	return result;
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
