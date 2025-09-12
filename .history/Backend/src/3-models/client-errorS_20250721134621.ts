import { StatusCode } from "./enums";

export class ClientError {

    public status: StatusCode;
    public message: string;

    public constructor(status: StatusCode, message: string) {
        this.status = status;
        this.message = message;
    }

}

export class RouteNotFound extends ClientError{
    public constructor(method: string, route: string){
        super(StatusCode.NotFound, `Route ${route} on method ${method} not found`);
    }
}

export class ResourceNotFound extends ClientError{
    public constructor(id: number){
        super(StatusCode.NotFound, `id ${id} not found.`);
    }
}


export class ValidationError extends ClientError{
    public constructor(message: string){
        super(StatusCode.BadRequest, message);
    }
}

