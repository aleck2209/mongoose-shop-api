import mongoose from "mongoose";
import type {
	ErrorRequestHandler,
	Request,
	Response,
	NextFunction,
} from "express";
import AppError from "./app-error.middleware.ts";

const errorMiddlware: ErrorRequestHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof mongoose.Error.ValidationError) {
		const errors = Object.values(err.errors).map((error) => ({
			field: error.path,
			message: error.message,
		}));

		res.status(400).json({
			error: "ValidationError",
			message: "Invalid data",
			errors,
		});

		return;
	}

	if (err instanceof mongoose.Error.CastError) {
		res.status(400).json({
			error: "CastError",
			message: "Invalid ressource indentifier",
		});

		return;
	}

	if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
        res.status(409).json({
            error: "DuplicateKeyError",
            message: "A resource with this value already exists",
        });

        return;
	}

	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			message: err.message
		})

		return;
	}

    console.error(err);

    res.status(500).json({
        error: "InternalServerError",
        message: "An unexpected error occurred",
    })
};

export default errorMiddlware;
