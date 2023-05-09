import { StatusCodes as STATUS } from "http-status-codes";

export class HttpException extends Error {
    public code: number;
    public status: string;
    public message: string;

    constructor(code: number, status: string, message: string) {
        super(message);
        this.code = code;
        this.status = status;
        this.message = message;
    }
}

/**
 * Returns a response with status code 400.
 */
export class HttpExceptionBadRequest extends HttpException {
    constructor(message: string) {
        super(STATUS.BAD_REQUEST, "BAD_REQUEST", message);
    }
}
/**
 * Returns a response with status code 401.
 */
export class HttpExceptionUnauthorize extends HttpException {
    constructor(message: string) {
        super(STATUS.UNAUTHORIZED, "UNAUTHORIZED", message);
    }
}

/**
 * Returns a response with status code 404.
 */
export class HttpExceptionNotFound extends HttpException {
    constructor(message: string) {
        super(STATUS.NOT_FOUND, "NOT_FOUND", message);
    }
}

/**
 * Returns a response with status code 429.
 */
export class HttpExceptionTooManyRequests extends HttpException {
    constructor(message: string) {
        super(STATUS.TOO_MANY_REQUESTS, "TOO_MANY_REQUEST", message);
    }
}

/**
 * Returns a response with status code 406.
 */
export class HttpExceptionNotAcceptable extends HttpException {
    constructor(message: string) {
        super(STATUS.NOT_ACCEPTABLE, "NOT_ACCEPTABLE", message);
    }
}

/**
 * Returns a response with status code 403.
 */
export class HttpExceptionForbidden extends HttpException {
    constructor(message: string) {
        super(STATUS.FORBIDDEN, "FORBIDDEN", message);
    }
}

/**
 * Returns a validation error response.
 */
export class HttpExceptionValidationError extends HttpException {
    constructor(message: string) {
        super(STATUS.UNPROCESSABLE_ENTITY, "UNPROCESSABLE_ENTITY", message);
    }
}
