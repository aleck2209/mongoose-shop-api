import { Router } from "express";
import { createProductController, getProductController, getAllProductsController, deleteProductController } from "./product.controller.ts";

const productRoutes = Router();

productRoutes.post('/', createProductController);
productRoutes.get('/', getAllProductsController);
productRoutes.get('/:id', getProductController);
productRoutes.delete('/:id', deleteProductController);

export default productRoutes;