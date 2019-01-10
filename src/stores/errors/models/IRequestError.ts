export default interface IRequestError {
    readonly httpErrorResponse: Error;
    readonly id: string;
}
