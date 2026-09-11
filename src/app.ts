import express, {type Express} from "express";
import userRoutes from "./modules/user/user.route.ts";
import errorMiddlware from "./middlewares/error.middleware.ts";
import { error } from "console";

const app: Express = express();

app.use(express.json());

app.use('/users', userRoutes)

app.use(errorMiddlware);

export default app;