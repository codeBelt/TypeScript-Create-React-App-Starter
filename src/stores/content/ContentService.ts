import HttpUtility from '../../utilities/HttpUtility';
import ITopic from './models/ITopic';
import {AxiosResponse} from 'axios';
import environment from 'environment';

export default class ContentService {

    private static _http: HttpUtility = new HttpUtility();

    public static async loadContent(): Promise<ITopic[]> {
        const endpoint: string = environment.api.topics;
        const response: AxiosResponse = await ContentService._http.get(endpoint);

        return response.data;
    }

}
