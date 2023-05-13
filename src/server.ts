import { config } from "dotenv";
config();
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
const app = express();

import { PORT } from "./utils/constant.utils";
import Routers from "./router";
import { NODE_ENV } from "./utils/constant.utils";
import errorMiddleware from "./middleware/error.middleware";

const registerRoute = new Routers();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(helmet());
app.use(registerRoute.router);
app.use(errorMiddleware);
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status_code: 404,
        message: "NOT FOUND ROUTE",
    });
});

app.listen(PORT, () => {
    console.log(`\t| 🚀🚀 ${NODE_ENV}: Server running on port ${PORT} 🚀🚀 |`);
});