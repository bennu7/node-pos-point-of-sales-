export interface IApiResponse {
    status_code: number;
    message: string;
    data?: unknown;
    errors?: string | object;
}

export function apiResponse(
    status_code: number,
    message: any,
    data?: any
): IApiResponse {
    return {
        status_code,
        message,
        data
    };
}