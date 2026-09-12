import express, {type Express} from "express";
import userRoutes from "./modules/user/user.route.ts";
import productRoutes from "./modules/product/product.route.ts";
import errorMiddlware from "./middlewares/error.middleware.ts";


const app: Express = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use(errorMiddlware);

export default app;