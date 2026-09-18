import express, {type Express} from "express";
import userRoutes from "./modules/user/user.route.ts";
import productRoutes from "./modules/product/product.route.ts";
import orderRoutes from "./modules/order/order.route.ts";
import errorMiddlware from "./middlewares/error.middleware.ts";
import notFoundMiddleware from "./middlewares/not-found.middleware.ts";
import loggerMiddleware from "./middlewares/logger.middleware.ts";


const app: Express = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddlware);

export default app;