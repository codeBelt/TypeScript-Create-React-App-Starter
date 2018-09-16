/**
 * A response that represents an error or failure, either from a
 * non-successful HTTP status, an error while executing the request,
 * or some other failure which occurred during the parsing of the response.
 */
import {BaseModel} from 'sjs-base-model';

export default class HttpErrorResponse extends BaseModel {
    public readonly name: string = '';
    public readonly message: string = '';
    public readonly error: any | null = null;
    public readonly ok: boolean = false;
    public readonly status: number = null;
    public readonly statusText: string = '';
    public readonly stack: string = '';
    public readonly url: string = '';

    constructor(data: Partial<HttpErrorResponse>) {
        super();

        this.update(data);
    }

    public update(data: Partial<HttpErrorResponse>): void {
        super.update(data);
    }

}
