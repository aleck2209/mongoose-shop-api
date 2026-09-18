import type { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const isValidId = (req: Request<{id: string}>, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({
            message: "Bad Request",
        });
        return;
    }
    next();
}

export default isValidId