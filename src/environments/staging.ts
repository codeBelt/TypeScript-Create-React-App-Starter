import environment from './production';
import CacheService from '../utilities/CacheService';

export default {
    apiCacheTime: {
        duration: 8,
        unit: CacheService.HOURS,
    },
    api: {
        ...environment.api,
        // override any endpoints
    },
    isProduction: false,
    isDevelopment: true,
};
