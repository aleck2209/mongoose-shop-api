import express, {type Express} from "express";
import userRoutes from "./modules/user/user.route.ts";

const app: Express = express();

app.use(express.json());

app.use('/users', userRoutes)

export default app;