import HttpErrorResponse from './models/HttpErrorResponse';

export enum RequestMethod {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE',
    Options = 'OPTIONS',
    Head = 'HEAD',
    Patch = 'PATCH',
}

// http://httpstat.us
// https://davidwalsh.name/fetch
export default class HttpUtility {

    public async get(endpoint: string): Promise<any> {
        // const requestData: RequestInit = {
        //     body: JSON.stringify({asdf: 'asdf'})
        // };

        return this._fetch(endpoint, RequestMethod.Get);
    }

    // public async post(endpoint: string): Promise<Response | HttpErrorResponse> {
    //     return this._fetch(endpoint, RequestMethod.Post);
    // }
    //
    // public async put(endpoint: string): Promise<Response | HttpErrorResponse> {
    //     return this._fetch(endpoint, RequestMethod.Put);
    // }
    //
    // public async delete(endpoint: string): Promise<Response | HttpErrorResponse> {
    //     return this._fetch(endpoint, RequestMethod.Delete);
    // }

    private async _fetch(endpoint: string, methodType: RequestMethod, init?: RequestInit): Promise<Body['json']> {
        const headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(endpoint, {
            headers,
            method: methodType,
        });

        let response: Response;
        try {
            response = await fetch(request, init);

            if (response.ok === false) {
                alert(`${response.statusText}`);
            }

            return response.json();
        } catch (error) {
            console.log(`response`, response);
            throw new HttpErrorResponse({
                error,
                message: error.message,
                name: error.name,
                ok: false,
                stack: error.stack,
                status: error.status,
                statusText: error.statusText,
                url: request.url,
            });
        }
    }

}
