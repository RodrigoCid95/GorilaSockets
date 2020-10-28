export interface ResponseError {
    level: number;
    code: number;
    message: string;
    stack?: any;
    [x: string]: any;
}
export interface SocketsResponse {
    data?: any;
    error?: ResponseError;
}
