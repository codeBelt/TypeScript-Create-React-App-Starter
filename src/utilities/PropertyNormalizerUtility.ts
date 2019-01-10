import {Util} from 'sjs-base-model';
import StringUtility from './StringUtility';

export default class PropertyNormalizerUtility {

    /**
     * Makes all property names camelCase so they are consistent in the application.
     * Recursively goes through child objects.
     *
     * @param json
     */
    public static normalize(json: object): object {
        const dataOrEmptyObject: object = json ? json : {};

        return Util.clone(dataOrEmptyObject, StringUtility.toCamelCase);
    }

}
