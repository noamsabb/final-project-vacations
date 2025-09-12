import { NextFunction, Request, Response } from "express";
import { appConfig } from "../2-utils/app-config";
import { ClientError } from "../3-models/client-error";
import { StatusCode } from "../3-models/enums";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Display error: 
        console.log(err);

        // Extract status code (if no status, it means server crash): 
        const status = err.status || StatusCode.InternalServerError;

        // Extract message: 
        const isCrash = status >= 500 && status <= 599;
        const message = isCrash && appConfig.isProduction ? "Some error, please try again." : err.message;

        // Send error back to client: 
        response.status(status).send(message);
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        next(new ClientError(StatusCode.NotFound, `Route ${request.originalUrl} not found.`));
    }

}

export const errorMiddleware = new ErrorMiddleware();
