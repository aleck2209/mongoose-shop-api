import { Router } from "express";
import { createProductController, getProductController, getAllProductsController, deleteProductController } from "./product.controller.ts";
import isValidId from "../../middlewares/valid-id.middleware.ts";

const productRoutes = Router();

productRoutes.post('/', createProductController);
productRoutes.get('/', getAllProductsController);
productRoutes.get('/:id', isValidId, getProductController);
productRoutes.delete('/:id', isValidId, deleteProductController);

export default productRoutes;