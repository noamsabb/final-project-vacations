import { NextFunction, Request, Response } from "express";
import { cyber } from "../2-utils/cyber"
import { ForbiddenError } from "../3-models/client-errors";
import striptags from "striptags"; // npm i striptags

class SecurityMiddleware {

    public verifyToken(request: Request, response: Response, next: NextFunction) : void {

        // Extract the token: "Bearer the-token..."
        //                    "01234567..."
        const token = request.headers.authorization?.substring(7);

        if(!cyber.verifyToken(token!)) {
            const err = new ForbiddenError("You are not logged-in.");
            next(err);
            return;
        }

        // All is good: 
        next();
    }

    public verifyAdmin(request: Request, response: Response, next: NextFunction) : void {

        // Extract the token: "Bearer the-token..."
        //                    "01234567..."
        const token = request.headers.authorization?.substring(7);

        console.log(token);
        
        if(!cyber.verifyAdmin(token!)) {
            const err = new ForbiddenError("You are not authorized.");
            next(err);
            return;
        }

        // All is good: 
        next();
    }

    public preventXssAttack(request: Request, response: Response, next: NextFunction): void {

        // Run on body object: 
        for(const prop in request.body) {

            // Take one value: 
            const value = request.body[prop];

            // If string: 
            if(typeof value === "string") {

                // Remove tags (<script>, <link>, <span>, ... );
                // "abc" --> "abc"
                // "<script>abc</script>" --> "abc"
                request.body[prop] = striptags(value);
            }
        }

        // Move on to next middleware: 
        next();
    }

}

export const securityMiddleware = new SecurityMiddleware();
