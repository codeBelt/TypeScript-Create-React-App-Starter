import axios, {AxiosResponse} from 'axios';
import CacheService from './CacheService';
import uuidV3 from 'uuid/v3';
import ICache from '../models/ICache';
import PropertyNormalizerUtility from './PropertyNormalizerUtility';
import environment from 'environment';

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
export default class HttpUtility {

    private _cacheService: CacheService = new CacheService(environment.apiCacheTime.duration, environment.apiCacheTime.unit);

    public async get(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethod.Get,
        });

        return this._fetch(request);
    }

    public async cacheGet(endpoint: string): Promise<AxiosResponse<any>> {
        const cacheKey: string = uuidV3(endpoint, uuidV3.URL);
        const hasTimestampExpired: boolean = await this._cacheService.hasTimestampExpiredFor(cacheKey);

        if (hasTimestampExpired) {
            const response: AxiosResponse = await this.get(endpoint);

            await this._cacheService.set(cacheKey, {
                data: response.data,
                status: response.status,
                statusText: 'from local cache',
                headers: null,
                config: null,
            });

            return response;
        }

        const cache: ICache = await this._cacheService.get(cacheKey);

        return cache.value;
    }

    // TODO: finish setting up
    public async post(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethod.Post,
        });

        return this._fetch(request);
    }

    // TODO: finish setting up
    public async put(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethod.Put,
        });

        return this._fetch(request);
    }

    // TODO: finish setting up
    public async delete(endpoint: string): Promise<AxiosResponse<any>> {
        const request = new Request(endpoint, {
            method: RequestMethod.Delete,
        });

        return this._fetch(request);
    }

    private async _fetch(request: Request, init?: any): Promise<AxiosResponse<any>> {
        try {
            const axiosResponse: AxiosResponse = await axios({
                data: init,
                method: request.method,
                url: request.url,
            });

            return {
                ...axiosResponse,
                data: PropertyNormalizerUtility.normalize(axiosResponse.data),
            }
        } catch (error) {
            console.log(`error`, error);

            return error;
        }
    }

}
